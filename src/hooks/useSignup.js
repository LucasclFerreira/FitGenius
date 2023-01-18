import { useState, useEffect } from "react";
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgURL = await img.ref.getDownloadURL();

      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgURL });

      // create a user document
      await projectFirestore.collection("users").doc(res.user.uid).set({
        displayName,
        photoURL: imgURL,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      if (!isCancelled) {
        setError(null);
      }
    } catch (err) {
      setIsPending(false);
      if (!isCancelled) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
