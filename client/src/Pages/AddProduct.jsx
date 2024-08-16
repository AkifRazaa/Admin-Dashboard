import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    pictures: [],
    userId: localStorage.getItem("userId"), // Get userId from localStorage
  });

  const [errors, setErrors] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({});
  };

  //Function for input validations
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name must contain only alphabets without spaces.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!formData.price || isNaN(formData.price)) {
      newErrors.price = "Price must be a number.";
    }

    if (!formData.quantity || isNaN(formData.quantity)) {
      newErrors.quantity = "Quantity must be a number.";
    }

    if (formData.pictures.length < 1 || formData.pictures.length > 6) {
      newErrors.pictures = "You must upload between 1 and 6 pictures.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Function to convert the user uploaded images to base64 then the basse64 of each image will be sent to backend to upload them on cloudinary
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedPictures = [...formData.pictures];
    const updatedPreviewImages = [...previewImages];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedPictures.push(reader.result);
        updatedPreviewImages.push(reader.result);
        setFormData({ ...formData, pictures: updatedPictures });
        setPreviewImages(updatedPreviewImages);
      };
      reader.readAsDataURL(file);
    });
  };

  //Function to handle remove images which the user removes
  const handleRemoveImage = (index) => {
    const updatedPictures = formData.pictures.filter((_, i) => i !== index);
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    setFormData({ ...formData, pictures: updatedPictures });
    setPreviewImages(updatedPreviewImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/add-product",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success === false) {
          throw new Error("Failed to add product.");
        } else {
          alert("Product added successfully!");
          setFormData({
            name: "",
            price: "",
            quantity: "",
            pictures: [],
          });
        }

        setPreviewImages([]);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ minWidth: 300, maxWidth: 500, mt: 4, mr: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          error={!!errors.price}
          helperText={errors.price}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          error={!!errors.quantity}
          helperText={errors.quantity}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
          Upload Pictures
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleImageChange}
          />
        </Button>

        {errors.pictures && (
          <Typography color="error" variant="body2">
            {errors.pictures}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 5,
            mt: 2,
          }}
        >
          {/* The user uploaded images will be displayed here using the map function */}
          {previewImages.map((image, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <img
                src={image}
                alt={`Preview ${index}`}
                style={{ width: 120, height: 120, objectFit: "cover" }}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Box sx={{ position: "relative", mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            Submit
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </form>
    </Box>
  );
};

export default AddProduct;
