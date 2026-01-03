import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export async function registerUser(req,res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Missing Required Fields"
            })
        };
        if (!email.endsWith("@gmail.com")) {
            return res.status(422).json({
                message: "Email is Invaild"
            })
        };
        if (password.length < 8) {
            return res.status(422).json({
                message: "Password is atleast 8 Character."
        })
        };
        const createdUser = await User.create({
            username,
            email,
            password
        })
        const token = createdUser.generateToken();
        res.status(201).json({
            message: "Account Created Successful!!",
            token
        })
    } catch (e) {
        console.log(e.message)
        if (e.code === 11000) {
            return res.status(409).json({
                message: "Email is Already Exist!!"
            })
        };
        return res.status(500).json({
            message: "Internal server error"
        });
    };
}

export async function loginUser(req,res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Missing Required Fields"
            })
        }
        const loggedUser = await User.findOne({ email })
        const isMatched_Password = loggedUser.comparePassword(password)
        if (!loggedUser || !isMatched_Password) {
            return res.status(401).json({
                message: "invalid credentials"
            })
        }
        const token = loggedUser.generateToken()
        return res.status(200).json({
            message: "Login Successful!",
            token,
            user_id: loggedUser._id
        })
    } catch {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function updateUser(req,res) {
    try {
        const { username, email, password } = req.body;
        if (!username && !email && !password) {
            return res.status(400).json({
                message: "At least one field must be provided."
            })
        }
        
        // Validate email if provided
        if (email && !email.endsWith("@gmail.com")) {
            return res.status(422).json({
                message: "Email is Invalid"
            })
        };
        
        // Validate password if provided
        if (password && password.length < 8) {
            return res.status(422).json({
                message: "Password must be at least 8 characters."
            })
        };
        
        const user_id = req.user._id;
        const updateUser = await User.findById(user_id)
        if (!updateUser) {
            return res.status(404).json({
                message: "User not found in DataBase!"
            })
        }
        if (username) { updateUser.username = username };
        if (email) {
            updateUser.email = email
        };
        if (password) {
            updateUser.password = password
        };
        await updateUser.save();
        const newToken = updateUser.generateToken();
        return res.status(200).json({
            message: "User Update Successful!",
            user_id: updateUser._id,
            newToken: newToken
        })
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            message: "Internal server error"
        });
    };
}

export async function deleteUser(req, res) {
    try {
        const user_id = req.user._id;
        const deletedUser = await User.findByIdAndDelete(user_id);
        if (!deletedUser) {
            return res.status(404).json({
                message: "User Not Found in Database."
            })
        }
        return res.status(200).json({
            message: "User Delete Successful!",
            deleted_user_id: deletedUser._id
        })
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}