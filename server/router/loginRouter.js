import express from "express";
import { userLogin, userSignup, getCountryList, getStateList } from "../controllers/loginController.js";

const router = express();

router.post("/login", userLogin);           
router.post("/signup", userSignup);           
router.get("/countries", getCountryList);           
router.get("/states/:countryCode", getStateList);
router.get("/logout", (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out.." });
});

export default router;