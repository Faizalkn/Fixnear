import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        // Personal Information
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

               // Admin Role
        role: {
            type: String,
            enum: ["ADMIN", "SUPER_ADMIN"],
            default: "ADMIN"
        },
    },
    {
        timestamps: true
    },

);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;