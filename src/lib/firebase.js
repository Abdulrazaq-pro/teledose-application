import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged, // Import this function
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { firebaseApp } from "./firebaseConfig";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const firebaseSignup = async (
  email,
  password,
  username,
  location,
  emergencyContact,
  healthConditions
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      location,
      emergencyContact,
      healthConditions,
    });

    return user;
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error(error.message || "Signup failed. Please try again.");
  }
};

export const firebaseLogin = async (identifier, password) => {
  try {
    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(
        auth,
        identifier,
        password
      );
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", identifier));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error("User with this username does not exist.");
        }

        const userDoc = querySnapshot.docs[0];
        const userEmail = userDoc.data().email;

        userCredential = await signInWithEmailAndPassword(
          auth,
          userEmail,
          password
        );
      } else {
        throw error;
      }
    }

    return userCredential.user;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(error.message || "Login failed. Please try again.");
  }
};

// New function to check authentication status
export const checkAuthStatus = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          resolve(true); // User is logged in
        } else {
          resolve(false); // User is not logged in
        }
      },
      reject
    );
  });
};
