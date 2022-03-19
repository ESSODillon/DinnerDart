import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { projectAuth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection } from "firebase/firestore";
import { ref } from "firebase/storage";

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
      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await ref(uploadPath).put(thumbnail);
      const imgUrl = await img.ref.getDownloadURL();

      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      // create a user document
      await collection("users").doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
