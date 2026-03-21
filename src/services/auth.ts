import { initializeApp } from 'firebase/app';
import { ref } from 'vue';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  username: string;
};

export const mappedUser = ref<AuthUser | null>(null);

export type RegisterPayload = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

const emailPrefix = (email: string): string => {
  const prefix = email.split('@')[0]?.trim();
  return prefix || 'user';
};

const mapAuthUser = (
  user: User,
  override?: Partial<Pick<AuthUser, 'fullName' | 'username'>>
): AuthUser => {
  const email = user.email || '';
  const baseName = emailPrefix(email);

  return {
    id: user.uid,
    email,
    fullName: override?.fullName?.trim() || user.displayName || baseName,
    username: override?.username?.trim().toLowerCase() || baseName.toLowerCase(),
  };
};

export const register = async (
  payload: RegisterPayload
): Promise<{ user: AuthUser }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email.trim(),
      payload.password
    );
    const authUser = mapAuthUser(userCredential.user, {
      fullName: payload.fullName,
      username: payload.username,
    });

    await signOut(auth);
    mappedUser.value = null;
    return { user: authUser };
  } catch (error: any) {
    const errorCode = error.code;
    let errorMessage = 'Pendaftaran gagal';

    if (errorCode === 'auth/email-already-in-use') {
      errorMessage = 'Email sudah terdaftar';
    } else if (errorCode === 'auth/weak-password') {
      errorMessage = 'Password terlalu lemah';
    } else if (errorCode === 'auth/invalid-email') {
      errorMessage = 'Email tidak valid';
    }

    throw new Error(errorMessage);
  }
};

export const login = async (
  payload: LoginPayload
): Promise<{ user: AuthUser }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email.trim(),
      payload.password
    );
    const authUser = mapAuthUser(userCredential.user);
    mappedUser.value = authUser;

    return { user: authUser };
  } catch (error: any) {
    const errorCode = error.code;
    let errorMessage = 'Login gagal';

    if (errorCode === 'auth/user-not-found') {
      errorMessage = 'Email tidak terdaftar';
    } else if (errorCode === 'auth/wrong-password') {
      errorMessage = 'Password tidak valid';
    } else if (errorCode === 'auth/invalid-email') {
      errorMessage = 'Email tidak valid';
    }

    throw new Error(errorMessage);
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const user = auth.currentUser;
  if (!user) {
    mappedUser.value = null;
    return null;
  }

  const authUser = mapAuthUser(user);
  mappedUser.value = authUser;
  return authUser;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
  mappedUser.value = null;
};

export const isAuthenticated = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      mappedUser.value = user ? mapAuthUser(user) : null;
      resolve(!!user);
    });
  });
};
