import { Preferences } from '@capacitor/preferences';

const TOKEN_KEY = 'auth.jwt';
const USER_KEY = 'auth.user';
const USERS_KEY = 'auth.users';

type JwtPayload = {
  sub: string;
  email: string;
  username: string;
  exp: number;
  iat: number;
};

type StoredUser = {
  id: string;
  email: string;
  fullName: string;
  username: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  username: string;
};

export type RegisterPayload = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

export type LoginPayload = {
  emailOrUsername: string;
  password: string;
};

const encodeBase64Url = (value: object): string => {
  const encoded = btoa(JSON.stringify(value));
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
};

const decodeBase64Url = (value: string): string => {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  return atob(base64 + padding);
};

const toAuthUser = (user: StoredUser): AuthUser => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  username: user.username,
});

const nowInSeconds = (): number => Math.floor(Date.now() / 1000);

const createMockJwt = (user: StoredUser): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const payload: JwtPayload = {
    sub: user.id,
    email: user.email,
    username: user.username,
    iat: nowInSeconds(),
    exp: nowInSeconds() + 60 * 60 * 24,
  };

  const signature = encodeBase64Url({ sig: `${user.id}-${payload.iat}` });
  return `${encodeBase64Url(header)}.${encodeBase64Url(payload)}.${signature}`;
};

const parseJwtPayload = (token: string): JwtPayload | null => {
  try {
    const [, payloadToken] = token.split('.');
    if (!payloadToken) {
      return null;
    }

    return JSON.parse(decodeBase64Url(payloadToken)) as JwtPayload;
  } catch {
    return null;
  }
};

const readUsers = async (): Promise<StoredUser[]> => {
  const result = await Preferences.get({ key: USERS_KEY });
  if (!result.value) {
    return [];
  }

  try {
    return JSON.parse(result.value) as StoredUser[];
  } catch {
    return [];
  }
};

const writeUsers = async (users: StoredUser[]): Promise<void> => {
  await Preferences.set({ key: USERS_KEY, value: JSON.stringify(users) });
};

const writeSession = async (token: string, user: AuthUser): Promise<void> => {
  await Preferences.set({ key: TOKEN_KEY, value: token });
  await Preferences.set({ key: USER_KEY, value: JSON.stringify(user) });
};

export const register = async (
  payload: RegisterPayload
): Promise<{ token: string; user: AuthUser }> => {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const normalizedUsername = payload.username.trim().toLowerCase();
  const users = await readUsers();

  const duplicate = users.find(
    (user) =>
      user.email.toLowerCase() === normalizedEmail ||
      user.username.toLowerCase() === normalizedUsername
  );

  if (duplicate) {
    throw new Error('Email atau username sudah terdaftar');
  }

  const newUser: StoredUser = {
    id: `${Date.now()}`,
    email: normalizedEmail,
    fullName: payload.fullName.trim(),
    username: normalizedUsername,
    password: payload.password,
  };

  const token = createMockJwt(newUser);
  const authUser = toAuthUser(newUser);

  await writeUsers([newUser, ...users]);
  await writeSession(token, authUser);

  return { token, user: authUser };
};

export const login = async (
  payload: LoginPayload
): Promise<{ token: string; user: AuthUser }> => {
  const credential = payload.emailOrUsername.trim().toLowerCase();
  const users = await readUsers();

  const foundUser = users.find(
    (user) =>
      user.email.toLowerCase() === credential ||
      user.username.toLowerCase() === credential
  );

  if (!foundUser || foundUser.password !== payload.password) {
    throw new Error('Email/username atau kata sandi tidak valid');
  }

  const token = createMockJwt(foundUser);
  const authUser = toAuthUser(foundUser);

  await writeSession(token, authUser);

  return { token, user: authUser };
};

export const getToken = async (): Promise<string | null> => {
  const result = await Preferences.get({ key: TOKEN_KEY });
  return result.value;
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const result = await Preferences.get({ key: USER_KEY });
  if (!result.value) {
    return null;
  }

  try {
    return JSON.parse(result.value) as AuthUser;
  } catch {
    return null;
  }
};

export const logout = async (): Promise<void> => {
  await Preferences.remove({ key: TOKEN_KEY });
  await Preferences.remove({ key: USER_KEY });
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken();
  if (!token) {
    return false;
  }

  const payload = parseJwtPayload(token);
  if (!payload) {
    await logout();
    return false;
  }

  if (payload.exp <= nowInSeconds()) {
    await logout();
    return false;
  }

  return true;
};
