import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    phone: {
        type: String,
    },
    country: {
        type: String,
    },
    current_user: {
        type: String,
    },
})
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;