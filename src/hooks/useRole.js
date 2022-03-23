import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";

export const useRole = () => {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole() must be used inside a RoleProvider");
  }

  return context;
};
