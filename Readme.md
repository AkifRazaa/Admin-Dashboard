Features:
1. User Authentication: Users can log in using their credentials to access protected routes and perform actions such as adding, editing, and viewing products.

2. Product Listing: Display a list of products available for sale.

3. Add Product: Form to add new products to the listing.

4. Edit Product: Form to edit the details of an existing product.

5. Responsive Sidebar: Navigation drawer that adjusts to screen size.
Protected Routes: Routes that are accessible only to authenticated users.

---

Details of the files:

App.jsx
The main component that sets up the routing for the application. It includes both public and protected routes. The protected routes are accessible only when the user is authenticated.

ResponsiveSidebar.jsx
A responsive navigation drawer that provides links to different sections of the application such as adding a product, viewing the product list, and editing products.

Login.jsx
A component that handles user login. It includes a form for email and password, and upon successful authentication, stores the authentication token in local storage and navigates the user to the protected routes.

AddProduct.jsx
A form component that allows users to add new products to the product list.

DisplayProducts.jsx
A component that displays a list of products available for sale.

EditProduct.jsx
A form component that allows users to edit the details of an existing product.

NoRoute.jsx
A utility component that displays a message when the user navigates to a non-existent route.

ProtectedRoute.jsx
A utility component that checks if the user is authenticated. If not, it redirects the user to the login page.

How It Works?
1. Authentication: When the user logs in, the authentication token is stored in local storage. This token is checked by the ProtectedRoute component to allow or deny access to certain routes.

2. Routing: The App.jsx file sets up the routes for the application. Public routes are accessible to all users, while protected routes are accessible only to authenticated users.

3. Responsive Design: The ResponsiveSidebar component adjusts its layout based on the screen size, providing a seamless user experience across different devices.

---

All the data is being saved in the database.

---

Backend:

Features
1. User Authentication: Users can register and log in to access protected routes.
2. Product Management: Endpoints for adding, editing, and displaying products.
3. Database Integration: MongoDB is used for data storage.
4. Environment Configuration: Environment variables for secure configuration.


All the routes are present in the routes folder.