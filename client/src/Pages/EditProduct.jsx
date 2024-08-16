import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const EditProduct = () => {
  const [products, setProducts] = useState([]); //this is store products fetched from backend
  const [selectedProductId, setSelectedProductId] = useState(""); //to store the id of the selected product
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    pictures: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      fetchProductDetails(selectedProductId);
    }
  }, [selectedProductId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const product = response.data;
      setFormData({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        pictures: product.pictures,
      });
      setPreviewImages(product.pictures);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({});
  };

  //Validation function to validate user input
  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name must contain only alphabets and spaces.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!formData.price || isNaN(formData.price)) {
      newErrors.price = "Price must be a number.";
    }

    if (!formData.quantity || isNaN(formData.quantity)) {
      newErrors.quantity = "Quantity must be a number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Function to convert the updated images to base64
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

  //Function to handlr remove images if user removes any image.
  const handleRemoveImage = (index) => {
    const updatedPictures = formData.pictures.filter((_, i) => i !== index);
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    setFormData({ ...formData, pictures: updatedPictures });
    setPreviewImages(updatedPreviewImages);
  };

  //Function to send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/products/${selectedProductId}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.data.success === false) {
          throw new Error("Failed to update product.");
        } else {
          alert("Product updated successfully!");
          setFormData({ name: "", price: "", quantity: "", pictures: [] });
          fetchProducts();
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
        Edit Product
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Product</InputLabel>
        <Select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          {products.map((product) => (
            <MenuItem key={product._id} value={product._id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedProductId && (
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </form>
      )}
    </Box>
  );
};

export default EditProduct;
