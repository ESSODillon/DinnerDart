import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { projectAuth, projectStorage } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [url, setUrl] = useState(null);

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
      const imageRef = `thumbnails/${res.user.uid}/${thumbnail.name}`;

      const img = ref(projectStorage, imageRef);

      uploadBytes(imageRef, thumbnail)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });

      // const imgUrl = await img.ref.getDownloadURL();

      // add display AND PHOTO_URL name to user
      // await res.user.updateProfile({ displayName, photoURL: imgUrl });
      await updateProfile(res.user, { displayName, photoURL: url });

      // create a user document
      await collection("users").doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: url,
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
