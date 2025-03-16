# Saving Backend Data in MongoDB (Step-by-Step Guide)

This README will help you remember how to save backend data into MongoDB using **Mongoose** after a few years. Follow this guide step by step to ensure proper data storage in MongoDB.

---

## **1. Install Dependencies**
Make sure you have Node.js installed, then install the necessary packages:

```sh
npm install mongoose dotenv
```

- `mongoose` → For MongoDB interaction.
- `dotenv` → To store environment variables (like MongoDB URI).

---

## **2. Setup MongoDB Connection**
Create a file `db.js` to handle MongoDB connection:

```js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDb = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return; // Avoid multiple connections
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDb;
```

- This function connects to MongoDB and avoids duplicate connections.
- Use `.env` file to store the MongoDB URI safely.

### **Example `.env` file:**
```
MONGO_URI=mongodb://localhost:27017/yourDatabaseName
```

---

## **3. Define a Schema & Model**
Create a file `models/User.js` to define a schema:

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
```

- `mongoose.Schema` defines how data is structured.
- The model is created only if it doesn’t already exist (prevents duplicate errors in Next.js).

---

## **4. Handle Form Submission & Save Data**
Create a file `actions/form.js` to process and store form data:

```js
"use server";

import connectDb from "../db";
import User from "../models/User";

export const SubmitForm = async (formData) => {
    await connectDb(); // Ensure database connection

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const newUser = new User(data);
    await newUser.save();

    console.log("User data saved:", data);
    return { success: true, message: "User registered successfully" };
};
```

- **Extracts form data** using `FormData.get("fieldName")`.
- **Ensures connection to MongoDB** before saving.
- **Saves data** using Mongoose’s `.save()` method.

---

## **5. Update Frontend to Handle Submission**
Modify `page.js` to properly send form data:

```js
"use client";

import { useState } from "react";
import { SubmitForm } from "./actions/form";

export default function Home() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const result = await SubmitForm(formData);
        setMessage(result.message);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input name="name" type="text" placeholder="Enter your name" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input name="email" type="email" placeholder="Enter your email" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Password</label>
                    <input name="password" type="password" placeholder="Enter your password" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" required />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Submit</button>
                {message && <p className="text-green-600 text-center mt-4">{message}</p>}
            </form>
        </div>
    );
}
```

- Uses **`FormData` to pass form values**.
- Calls **`SubmitForm`** and **displays a success message**.

---

## **6. Run the Project**
Start your backend server and test the connection:

```sh
node server.js
```

Or if using Next.js:

```sh
npm run dev
```

---

## **Conclusion**
By following these steps, you can **connect your backend to MongoDB, define a schema, handle form submission, and store user data** properly. 🚀

If you ever need to recall this in the future, just follow this guide step by step!

