# 🛒 Elnagar SHOP — MERN E-Commerce

A full-stack **E-Commerce web application** built with the **MERN Stack**, featuring a customer-facing store, RESTful backend API, and a dedicated admin dashboard.

This project was built to practice and demonstrate real-world full-stack development, including authentication, product management, shopping cart functionality, order processing, payment integration, and admin management.

🔗 **GitHub Repository:** https://github.com/Y0ussef-elnagar/MERN_Ecommerce

---

## 📸 Project Overview

Elnagar SHOP is a complete e-commerce system consisting of three main applications:

* 🛍️ **Frontend** — Customer-facing e-commerce website
* ⚙️ **Backend** — RESTful API and business logic
* 🛠️ **Admin Dashboard** — Manage products, orders, and store operations

---

## ✨ Features

### 👤 User Features

* User registration and login
* Authentication using JWT
* Browse products
* View product details
* Add products to cart
* Update cart quantities
* Remove products from cart
* Checkout process
* Place orders
* View previous orders
* Order status tracking
* Responsive design

### 🛒 E-Commerce Features

* Product listing
* Product categories
* Shopping cart
* Order management
* Delivery charges
* Checkout system
* Stripe payment integration
* Payment verification
* Order history

### 🔐 Authentication & Security

* JWT-based authentication
* Password hashing with bcrypt
* Protected API routes
* Admin authentication
* Environment variables for sensitive configuration
* CORS configuration

### 🛠️ Admin Dashboard

The project includes a dedicated admin application for managing the store.

Admin features include:

* Admin login
* Add products
* View products
* Manage products
* Manage orders
* Update order status
* Delete products
* View customer orders
* Notification management

---

## 🧰 Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* React Router
* Tailwind CSS
* Axios
* Vite
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* Stripe
* CORS
* dotenv

### Admin Dashboard

* React.js
* JavaScript
* React Router
* Tailwind CSS
* Axios
* React Hot Toast
* Vite

---

## 📁 Project Structure

```text
MERN_Ecommerce/
│
├── admin/              # Admin Dashboard
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── back/               # Backend / REST API
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── front/              # Customer Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🚀 Getting Started

Follow the steps below to run the project locally.

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Y0ussef-elnagar/MERN_Ecommerce.git
```

Then:

```bash
cd MERN_Ecommerce
```

---

# ⚙️ Backend Setup

Navigate to the backend folder:

```bash
cd back
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `back` folder.

Example:

```env
PORT=4000

MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_JWT_SECRET

STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
```

> ⚠️ The exact environment variable names must match the ones used in your backend configuration files.

Start the backend development server:

```bash
npm run server
```

Or start it normally:

```bash
npm start
```

The API should be available at:

```text
http://localhost:4000
```

You can test the API by opening:

```text
http://localhost:4000
```

You should receive:

```text
API working
```

---

# 🖥️ Frontend Setup

Open a new terminal and navigate to:

```bash
cd front
```

Install dependencies:

```bash
npm install
```

If your frontend uses an environment variable for the backend URL, create:

```text
.env
```

inside the `front` folder.

Example:

```env
VITE_API_URL=http://localhost:4000
```

> ⚠️ Make sure the variable name matches the one used by your frontend code.

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, usually similar to:

```text
http://localhost:5173
```

---

# 🛠️ Admin Dashboard Setup

Open another terminal:

```bash
cd admin
```

Install dependencies:

```bash
npm install
```

Create the required `.env` file if your admin application uses environment variables.

Example:

```env
VITE_API_URL=http://localhost:4000
```

Start the admin dashboard:

```bash
npm run dev
```

The admin application will run on the local URL provided by Vite.

---

# 💳 Stripe Payment Setup

This project uses **Stripe** for online payments.

To enable payments locally:

1. Create a Stripe account.
2. Get your Stripe secret key.
3. Add the key to the backend `.env` file.
4. Make sure the frontend/backend URLs match your local configuration.
5. Restart the backend after changing environment variables.

Example:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
```

⚠️ Never commit your Stripe secret key to GitHub.

---

# 🗄️ MongoDB Setup

The backend uses **MongoDB** with **Mongoose**.

You can use:

* MongoDB Atlas
* Local MongoDB

Add your MongoDB connection string to the backend environment file.

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

⚠️ Replace the example value with your own MongoDB connection string.

---

# 🔑 Authentication

Authentication is implemented using **JWT**.

The application uses authentication for:

* User login
* User registration
* Protected user routes
* Admin authentication
* Order operations
* Cart operations

Passwords are securely hashed using **bcrypt** before being stored.

---

# 🔌 API Routes

The backend provides several REST API route groups:

```text
/api/user
/api/order
/api/product
/api/cart
/api/admin
/api/notifications
```

The backend also serves uploaded product images through:

```text
/images
```

---

# 📦 Available Backend Scripts

Inside the `back` directory:

### Development

```bash
npm run server
```

Runs the backend using Nodemon.

### Production / Normal Start

```bash
npm start
```

Starts the Node.js server normally.

---

# 📦 Frontend Scripts

Inside the `front` directory:

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Create production build.

```bash
npm run preview
```

Preview the production build locally.

---

# 🛠️ Admin Scripts

Inside the `admin` directory:

```bash
npm run dev
```

Start the admin dashboard.

```bash
npm run build
```

Create production build.

```bash
npm run preview
```

Preview the production build.

---

# 📚 What I Learned

Building this project helped me practice and improve my understanding of:

* Full-stack web development
* MERN architecture
* RESTful API development
* React component architecture
* State management
* Authentication & authorization
* JWT
* Password hashing
* MongoDB & Mongoose
* CRUD operations
* File uploads
* Payment integration with Stripe
* Admin dashboards
* API integration using Axios
* Environment variables
* Git & GitHub
* Deployment
* Debugging full-stack applications

---

# 🚧 Future Improvements

Some features I plan to improve or add:

* [ ] Product search
* [ ] Advanced filtering
* [ ] Product reviews & ratings
* [ ] Wishlist
* [ ] Improved admin analytics
* [ ] Better error handling
* [ ] Email notifications
* [ ] More advanced order tracking
* [ ] Improved UI/UX
* [ ] Automated testing
* [ ] Performance optimization

---

# ⭐ Give It a Star

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

It really helps and motivates me to keep building and improving.

---

# 👨‍💻 Author

### Youssef Elnagar

Computer Science Student & Full-Stack Developer

Interested in building modern web applications using:

**React.js • Node.js • Express.js • MongoDB • Laravel**

📌 GitHub:
https://github.com/Y0ussef-elnagar

📌 LinkedIn:
[linkedin.com/in/youssefelnagardev](https://www.linkedin.com/in/youssefelnagardev/)

---

## 📄 License

This project was created for learning, portfolio, and educational purposes.
