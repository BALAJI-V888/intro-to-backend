# Node.js & Express.js Backend API

A backend REST API built while learning **Node.js, Express.js, MongoDB, and Mongoose** through a freeCodeCamp tutorial. The project covers the fundamentals of building a server-side application, connecting to MongoDB Atlas, creating models and routes, handling requests, and implementing user authentication-related functionality.

## 🚀 Tech Stack

* **Node.js** — JavaScript runtime
* **Express.js** — Backend web framework
* **MongoDB Atlas** — Cloud database
* **Mongoose** — MongoDB ODM
* **bcrypt** — Password hashing
* **dotenv** — Environment variable management
* **Nodemon** — Development server auto-restart

## 📁 Project Structure

```text
intro-to-backend/
│
├── backend/
│   └── src/
│       ├── config/
│       │   ├── constants.js
│       │   └── database.js
│       │
│       ├── models/
│       │   └── user.model.js
│       │
│       ├── routes/
│       │   └── user.route.js
│       │
│       └── index.js
│
├── .env
├── package.json
└── README.md
```

## ✨ Features

### User Model

The project uses a Mongoose schema for managing users with:

* Username
* Email
* Password
* Validation rules
* Unique username and email
* Automatic timestamps

Example schema fields:

```js
username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
}
```

### 🔐 Password Hashing

Passwords are hashed before being stored in MongoDB using **bcrypt**.

A Mongoose `pre("save")` middleware is used so that passwords are automatically hashed before a user document is saved.

```js
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});
```

### 🔍 Password Comparison

The User model also contains a custom method for comparing a plain-text password with the stored hashed password:

```js
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
```

### 🗄️ MongoDB Atlas

The application connects to a MongoDB Atlas cluster through Mongoose.

The database connection string is stored securely in an environment variable rather than directly in the source code.

```env
MONGO_URI=your_mongodb_connection_string
```

### 🌐 REST API

Express.js is used to create API routes for interacting with user resources.

The project demonstrates common HTTP operations such as:

* `GET` — Retrieve data
* `POST` — Create data
* `PUT` — Update data
* `DELETE` — Delete data

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd intro-to-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=3000
```

Replace the MongoDB URI with your own MongoDB Atlas connection string.

### 4. Start the development server

```bash
npm run dev
```

If Nodemon is configured, the server will automatically restart whenever you modify the source code.

## 🔄 Application Flow

```text
Client
   │
   │ HTTP Request
   ▼
Express Server
   │
   ▼
Routes
   │
   ▼
Controller / Logic
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB Atlas
   │
   ▼
Response
   │
   ▼
Client
```

## 🔐 Password Flow

```text
User enters password
        │
        ▼
Express receives request
        │
        ▼
Mongoose pre-save middleware
        │
        ▼
bcrypt.hash()
        │
        ▼
Hashed password stored in MongoDB
```

During login:

```text
User enters password
        │
        ▼
Find user in MongoDB
        │
        ▼
comparePassword()
        │
        ▼
bcrypt.compare()
        │
        ▼
true / false
```

## 📚 What I Learned

This project helped me understand the fundamentals of backend development, including:

* Setting up a Node.js project
* Using Express.js to build APIs
* ES Modules and `import` / `export`
* Creating RESTful routes
* Connecting Node.js to MongoDB Atlas
* Using Mongoose schemas and models
* Mongoose middleware
* Custom Mongoose document methods
* Password hashing with bcrypt
* Environment variables with dotenv
* HTTP status codes
* Using Nodemon during development
* Structuring a backend project

## 🎯 Learning Source

This project was developed as part of my learning journey using **freeCodeCamp's Node.js and Express.js course/tutorial**. The implementation was built for educational purposes while learning backend development concepts.

## 📝 Note

This is a **learning project** and is not intended to be used as a production-ready authentication system. Additional security measures, validation, error handling, authentication tokens, rate limiting, and other production considerations would be required for a real-world application.

## 👨‍💻 Author

**Balaji Veerappan**

Learning and building with:

`JavaScript` • `Node.js` • `Express.js` • `MongoDB` • `Mongoose`
