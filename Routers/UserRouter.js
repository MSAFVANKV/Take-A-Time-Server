import express from "express";
import { Signup, Login, logout, getUser } from "../Controllers/Create.js";
import { UploadDetails, checkPaymentStatus } from "../Controllers/accountDetails.js";
import { savePayment } from "../Controllers/paypalPayment.js";

import authenticateJWT from "../Middlwares/authenticateJWT.js";

const router = express.Router();

/*1. helping to sign up =>*/ router.route("/signup").post(Signup);

/*2 . helping to Login =>*/ router.route("/login").post(Login);

/*2a . helping to Login =>*/ router.route("/get-user").get(authenticateJWT,getUser);


/*3 . helping to Session Check =>*/
router.get("/chech-auth", authenticateJWT, (req, res) => {
  //    console.log("jwt /chech-auth");
  return res.json({ 
    valid: true ,
});
});

/*4 . save all steps when signup =>*/ router
  .route("/upload-details")
  .post(authenticateJWT, UploadDetails);

/*5 . save 3rd step paypal payment =>*/ router
  .route("/save-payment")
  .post(authenticateJWT, savePayment);

  /*6 . checkPaymentStatus =>*/
  router.route("/check-payment-status").get(authenticateJWT, checkPaymentStatus);


router.route("/logout").get(logout);

export default router;
