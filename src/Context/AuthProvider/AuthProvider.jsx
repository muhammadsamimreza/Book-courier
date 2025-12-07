import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
 const updateProfileInfo = (profile) =>{
    return updateProfile(auth.currentUser ,profile)
 }
  const logOut =()=>{
    setLoading(true);
    return signOut(auth);
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged((auth), (currentUser)=>{
        setUser(currentUser);
        setLoading(false);
    })
    return ()=>{
        unSubscribe()
    }
  }, [loading]);
  const authInfo = {
    user,
    loading,
    registerUser,
    signinUser,
    signInWithGoogle,
    logOut,
    updateProfileInfo,
    
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
