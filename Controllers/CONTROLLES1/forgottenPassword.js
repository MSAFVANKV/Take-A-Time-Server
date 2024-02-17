import nodmailer from 'nodemailer';
import userCollection from "../../Modals/UserModal.js";

export const test = (req,res) => {
    console.log("test")
}

export const sendMail = async (req,res) => {
    console.log("recover-email cotroller");
    try {
        const {recipient_mail,otp} = req.body
        console.log(recipient_mail,'recipient_mail');

        const email = await userCollection.findOne({ email:recipient_mail });
        if (!email) {
          console.log("Email is not registered,sendMail !!");
          return res.json({
            status: 404,
            msg: "Email not registered !!",
            recovery: false,
          });
        }

        var transporter = nodmailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.TAT_EMAIL_ID, // generated ethereal email
                pass:process.env.TAT_SECURITY_KEY  // generated ethereal password
            },
        });

        const mail_configs = {
            from:process.env.TAT_EMAIL_ID,
            to:recipient_mail,
            subject:`TAKE A TICKET PASSWORD RECOVERY`,
            html:`<div style="background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
                <h2 style="text-align: center; color: #3498db;">TAKE A TICKET PASSWORD RECOVERY</h2>
                <p style="text-align: center; font-size: 18px;">HERE IS YOUR OTP:</p>
                <div style="background-color: #3498db; color: #fff; text-align: center; font-size: 24px; padding: 10px; border-radius: 5px; margin: 20px auto; width: 200px;">${otp}</div>
            </div>
        </div>
        `
        };
        transporter.sendMail(mail_configs, (error,info) => {
            if(error){
                console.log(error,"error in transporter.sendMail");
            }
            return res.json({ message:"Email sent succesfully" })

        });
    } catch (error) {
        console.log(error,"error in transporter.sendMail catch ");
    }
}