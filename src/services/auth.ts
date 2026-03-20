import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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
export const db = getFirestore(app);

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
  email: string;
  password: string;
};

// Create user profile in Firestore
const createUserProfile = async (
  user: User,
  payload: RegisterPayload
): Promise<void> => {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    fullName: payload.fullName,
    username: payload.username.toLowerCase(),
    createdAt: new Date(),
  });
};

// Get user profile from Firestore
const getUserProfile = async (uid: string): Promise<AuthUser | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        id: uid,
        email: data.email,
        fullName: data.fullName,
        username: data.username,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
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

    // await createUserProfile(userCredential.user, payload);

    // const authUser: AuthUser = {
    //   id: userCredential.user.uid,
    //   email: userCredential.user.email || '',
    //   fullName: payload.fullName,
    //   username: payload.username.toLowerCase(),
    // };

    await signOut(auth);

    // return { user: authUser };
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

    // const userProfile = await getUserProfile(userCredential.user.uid);
    // if (!userProfile) {
    //   throw new Error('Profil pengguna tidak ditemukan');
    // }

    // return { user: userProfile };
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
    return null;
  }

  return getUserProfile(user.uid);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const isAuthenticated = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
};
