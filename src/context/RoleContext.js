import { createContext, useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const RoleContext = createContext();

const roleReducer = (state, action) => {
  switch (action.type) {
    case "ROLE":
      return { ...state, role: action.payload };
    default:
      return state;
  }
};

export function RoleProvider({ children }) {
  const [state, dispatch] = useReducer(roleReducer, {
    role: null,
  });
  const { user, authIsReady } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [currentRole, setCurrentRole] = useState("");

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "ROLE", payload: currentRole });
      unsub();

      if (!authIsReady) {
        unsub();
      }
    });
  }, [currentRole]);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("users").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("Data failed to load");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setUserData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  // If the currently logged user's ID matches a document in the users table ID, console log that users role

  useEffect(() => {
    if (user != null && userData != null && authIsReady) {
      for (let x in userData) {
        if (user.uid == userData[x].id && userData[x].role == "admin") {
          setCurrentRole("admin");
          return;
        } else {
          setCurrentRole("");
        }
        if (user.uid == userData[x].id && userData[x].role == "customer") {
          setCurrentRole("customer");
          return;
        } else {
          setCurrentRole("");
        }
        if (user.uid == userData[x].id && userData[x].role == "restaurant") {
          setCurrentRole("restaurant");
          return;
        } else {
          setCurrentRole("");
        }
        if (user.uid == userData[x].id && userData[x].role == "darter") {
          setCurrentRole("darter");
          return;
        } else {
          setCurrentRole("");
        }
      }
    }
  }, [user, userData]);

  if (authIsReady) {
    console.log(currentRole);
  }

  return (
    <RoleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RoleContext.Provider>
  );
}
