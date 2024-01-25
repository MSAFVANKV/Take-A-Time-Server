import express from "express";
import { Signup, Login, logout } from "../Controllers/Create.js";
import sessionCheck from "../Middlwares/SessionCheck.js";
import authenticateJWT from "../Middlwares/authenticateJWT.js";

const router = express.Router();

/*1. helping to sign up =>*/  router.route("/signup").post(Signup);

/*2 . helping to Login =>*/   router.route("/login").post(Login)

/*2 . helping to Session Check =>*/ 
router.get('/chech-auth', authenticateJWT, (req, res) => {
    //    console.log("jwt /chech-auth");
            return res.json({valid:true})
      
    });

    router
    .route('/logout')
    .get(logout);


export default router;
