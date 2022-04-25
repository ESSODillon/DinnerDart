import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore("restaurants");
  const { documents } = useCollection("restaurants");
  const { user } = useAuthContext();

  // form field states and values
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [hours, setHours] = useState("");
  const [rating, setRating] = useState(0);
  const [state, setState] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [formError, setFormError] = useState(null);

  const cuisinesList = [];

  for (let x in documents) {
    let cuisines = documents[x].cuisines;
    // console.log(cuisines);

    for (let y in cuisines) {
      cuisinesList.push(cuisines[y]);
    }
  }

  const filterList = cuisinesList.filter((c, index) => {
    return cuisinesList.indexOf(c) === index;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Substitutes for 'required'
    if (cuisines.length < 1) {
      setFormError("Please assign the restaurant to at least 1 cuisine type");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const restaurant = {
      name,
      address,
      city,
      cuisines,
      hours,
      image,
      phone,
      rating,
      state,
      zipCode,
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
          <span className="create-form__span">cuisines:</span>
          <Select
            multiple
            className="create-form__input"
            sx={{ padding: 0 }}
            value={cuisines}
            onChange={(e) => setCuisines(e.target.value)}
            input={<OutlinedInput id="select-multiple-chip" />}
            renderValue={(selected) => (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                }}
              >
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {filterList.map((filter) => (
              <MenuItem sx={{}} key={filter} value={filter}>
                {filter}
              </MenuItem>
            ))}
          </Select>
        </label>
        <label className="create-form__label">
          <span className="create-form__span">rating:</span>
          <Rating
            onChange={(e) => setRating(e.target.value)}
            size="large"
            value={rating}
          />
        </label>
        <label className="create-form__label">
          <span className="create-form__span">name:</span>
          <input
            required
            className="create-form__input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label className="create-form__label">
          <span className="create-form__span">state:</span>
          <input
            required
            className="create-form__input"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </label>
        <label className="create-form__label">
          <span className="create-form__span">city:</span>
          <input
            required
            className="create-form__input"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </label>
        <label className="create-form__label">
          <span className="create-form__span">address:</span>
          <input
            required
            className="create-form__input"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </label>
        <label className="create-form__label">
          <span className="create-form__span">hours:</span>
          <input
            required
            className="create-form__input"
            onChange={(e) => setHours(e.target.value)}
            value={hours}
          />
        </label>
        <label className="create-form__label">
          <span className="create-form__span">image url:</span>
          <input
            required
            className="create-form__input"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label className="create-form__label">
          <span className="create-form__span">phone number:</span>
          <input
            required
            className="create-form__input"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </label>
        <label className="create-form__label">
          <span className="create-form__span">zip code:</span>
          <input
            required
            className="create-form__input"
            onChange={(e) => setZipCode(e.target.value)}
            value={zipCode}
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
