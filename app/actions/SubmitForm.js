"use server"
import User from "../models/User";
import connectDB from "../db";

export const SubmitForm = async (form, from) => {
  await connectDB();

  //get all user details from database

  const users = await User.find({});
  let existingUser;
  //check if the user already exists by email
  if (from == "register" || from == "login") {
    existingUser = users.find(
      (user) => user.email === form.email || user.username === form.username || user.phone === form.phone
    );

  }

  if (from == "register") {

    if (existingUser && form == "register") {
      let message = "User already exists with Similar ";

      const conflicts = [];
      if (existingUser.email === form.email) conflicts.push("Email");
      if (existingUser.username === form.username) conflicts.push("Username");
      if (existingUser.phone === form.phone) conflicts.push("Phone Number");

      message += conflicts.join(", "); // Combine conflicts into a single message

      return { success: false, message };
    } else {
      const newUser = new User(form);
      await newUser.save();
      return { success: true, message: "User registered successfully. Redirecting to Home page..." };
    }



  }
  const existingUser2 = users.find(
    (user) => user.email === form.email && user.username === form.username && user.phone === form.phone
  );

  //for forgot password form

  if (existingUser2 && from == "ChangePassword") {
    existingUser2.password = form.password;
    existingUser2.confirmPassword = form.password;
    await existingUser2.save();
    return { success: true, message: "Password changed successfully" };
  } else if (!existingUser2 && from == "ChangePassword") {
    return { success: false, message: "User not found" };
  }

  async function updateUserStatus(username, message) {
    try {
      const response = await fetch("http://localhost:3000/api/info", { // Replace with your actual API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, message }),
      });
  
      const data = await response.json(); // Convert response to JSON
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update user status");
      }
  
      return data; // Return the response data if needed
    } catch (error) {
      console.error("Error updating user status:", error);
      return { success: false, message: error.message };
    }
  }
  


  //for login form
  if (existingUser && from === "login") {
    if (existingUser.password === form.password) {
      await updateUserStatus(form.username, "yes"); // Ensure it completes before proceeding
      return { success: true, message: "User logged in successfully" };
    } else {
      return { success: false, message: "Incorrect password" };
    }
  } else {
    return { success: false, message: "User not found" };
  }





}

