import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

/**
 * Sign in with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} Firebase user object
 * @throws {Error} Authentication error
 */
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    let errorMessage = 'An error occurred during sign in.';
    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid email or password.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later.';
    }
    throw new Error(errorMessage);
  }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 * @throws {Error} Sign out error
 */
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error('An error occurred while signing out.');
  }
}; 