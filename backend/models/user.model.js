import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function comparePassword(user_passwords) {
    return await bcrypt.compare(user_passwords, this.password)
};

userSchema.methods.generateToken = function generateToken() {
    return jwt.sign({
        _id: this._id, 
        username: this.username,
        email: this.email,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIREY
    })
}

const User = mongoose.model("user", userSchema);

export default User;