import User from "../model/userSchema.js";
import Country from "../model/countrySchema.js";
import State from "../model/stateSchema.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ username }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
            return res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(user);
        } 
        else {
            return res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Error logging in" });
    }
};


export const userSignup = async (req, res) => {
    try {
        const { username, password, firstName, lastName, phoneNumber, email, country, state } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, firstName, lastName, phoneNumber, email, country, state });
        if (await User.findOne({username})) {
            res.status(409).json({ message: "Username already exists" });
        } 
        else {
            await user.save();
            res.status(200).json(user);
        }
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ error: "Error logging in" });
    }
}

export const getCountryList = async (req, res) => {
    try {
        const country = await Country.find();
        res.json(country);
    } catch (err) {
        console.error("Error fetching countries:", err);
        res.status(500).json({ error: "Failed to fetch countries" });
    }
}

export const getStateList = async (req, res) => {
    try {
        const { countryCode } = req.params;
        const state = await State.find({ countryCode: countryCode });
        res.json(state);
    } catch (err) {
        console.error("Error fetching states:", err);
        res.status(500).json({ error: "Failed to fetch states" });
    }
}