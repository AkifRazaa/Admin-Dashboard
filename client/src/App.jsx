import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import DisplayProducts from "./Pages/DisplayProducts";
import EditProduct from "./Pages/EditProduct";
import AddProduct from "./Pages/AddProduct";
import ResponsiveDrawer from "./Components/ResponsiveSidebar";
import Login from "./Pages/Login";
import { Box, Toolbar } from "@mui/material";
import NoRoute from "./utils/NoRoute";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  const drawerWidth = 240;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <ResponsiveDrawer />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: { sm: `${drawerWidth}px` },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                  }}
                >
                  <Toolbar />
                  <Routes>
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="product-list" element={<DisplayProducts />} />
                    <Route path="edit-product" element={<EditProduct />} />
                    <Route path="/" element={<Navigate to="add-product" />} />
                    <Route path="*" element={<NoRoute />} />
                  </Routes>
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
