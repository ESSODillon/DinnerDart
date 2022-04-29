import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ id }) {
  const { addDocument, response } = useFirestore(`restaurants/${id}/menu`);
  const [open, setOpen] = useState(false);
  // form field states and values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const menu_item = {
      name,
      description,
      price,
      image,
    };

    await addDocument(menu_item);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
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
          width: "30%",
          marginBottom: "3rem",
        }}
        size="large"
      >
        Create New Menu Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Menu Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new menu item for this restaurant, please fill out the
            form below. Prices are required to be a number, and images need to
            be a url.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="create-menu-item">
            <label className="create-form__label">
              <span className="create-form__span">item name:</span>
              <input
                required
                className="create-form__input"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
            <label className="create-form__label">
              <span className="create-form__span">description:</span>
              <input
                required
                className="create-form__input"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </label>
            <label className="create-form__label">
              <span className="create-form__span">price:</span>
              <input
                required
                className="create-form__input"
                type={"number"}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </label>
            <label className="create-form__label">
              <span className="create-form__span">image url:</span>
              <input
                required
                className="create-form__input"
                type={"url"}
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            style={{
              background: "#d95d39",
              padding: "0.8rem 1.2rem",
              borderRadius: "10rem",
              fontFamily: "Lato",
              color: "#fdffff",
              cursor: "pointer",
              fontSize: "1.2rem",
              border: "none",
              textTransform: "capitalize",
              lineHeight: "1.8rem",
              display: "block",
              margin: "0 auto",
              width: "35%",
            }}
            size="large"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            type="submit"
            form="create-menu-item"
            style={{
              background: "#d95d39",
              padding: "0.8rem 1.2rem",
              borderRadius: "10rem",
              fontFamily: "Lato",
              color: "#fdffff",
              cursor: "pointer",
              fontSize: "1.2rem",
              border: "none",
              textTransform: "capitalize",
              lineHeight: "1.8rem",
              display: "block",
              margin: "0 auto",
              width: "35%",
            }}
            size="large"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
