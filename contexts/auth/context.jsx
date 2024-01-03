"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Swal from "sweetalert2";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState(null);

  const [navOpen, setNavOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    avtaar: "",
  });

  const handleChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, new GoogleAuthProvider())
      .then((user) => {
        return user.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
      });
  };

  const signUpUserWithEmailAndPassword = async (email, password) => {
    const data = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return {
          status: true,
          user: userCredential.user,
        };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);

        if (errorCode === "auth/email-already-in-use") {
          signInUserWithEmailAndPassword(email, password);
          return;
        }

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
        return {
          status: false,
          message: errorMessage,
          code: errorCode,
        };
      });
    return data;
  };

  const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
      setError("Please enter email and password");
      Swal.fire({
        title: "Error!",
        text: "Please enter email and password",
        icon: "error",
      });
      return;
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .then((user) => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
        // ..
      });
  };

  const emailPasswordResetSend = async (email) => {
    if (!email) {
      setError("Please enter email");
      Swal.fire({
        title: "Error!",
        text: "Please enter email",
        icon: "error",
      });
      return;
    }

    await sendPasswordResetEmail(auth, email).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
      // ..
    });
  };

  const logout = async () => {
    await signOut(auth).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
      // ..
    });
    // router.push('/');
  };

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signInWithGoogle,
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        emailPasswordResetSend,
        logout,
        userData,
        handleChange,
        error,
        setNavOpen,
        navOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
