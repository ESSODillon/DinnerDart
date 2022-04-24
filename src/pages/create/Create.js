import { useEffect, useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore("restaurants");
  const { documents } = useCollection("users");
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  // form field states and values
  const [name, setName] = useState("");
  const [eventPromoter, setEventPromoter] = useState("");
  const [weightClass, setWeightClass] = useState("");
  const [assignedFighters, setAssignedFighters] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Substitutes for 'required'
    if (!weightClass) {
      setFormError("Please select a weight class");
      return;
    }
    if (!eventPromoter) {
      setFormError("Please select an event promoter");
      return;
    }
    if (assignedFighters.length < 1) {
      setFormError("Please assign the event to at least 1 fighter");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const restaurant = {
      name: name,
      createdBy,
    };

    await addDocument(restaurant);

    if (!response.error) {
      history.push("/");
    }
  };

  return (
    <div className="create-background">
      <h2 className="page-title">Create a new event</h2>
      <form id="create-form" className="create-form" onSubmit={handleSubmit}>
        <h2 className="create-form__header">Create New Restaurant</h2>
        <label className="create-form__label">
          <span className="create-form__span">name:</span>
          <input
            required
            className="create-form__input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <Button
          variant="contained"
          type="submit"
          form="create-form"
          style={{
            background: "#d95d39",
            padding: "0.8rem 1.2rem",
            borderRadius: "10rem",
            fontFamily: "Lato",
            color: "#fdffff",
            cursor: "pointer",
            fontSize: "1.8rem",
            border: "none",
            textTransform: "capitalize",
            lineHeight: "1.8rem",
            display: "block",
            margin: "0 auto",
            width: "90%",
          }}
          size="large"
          margin="normal"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
