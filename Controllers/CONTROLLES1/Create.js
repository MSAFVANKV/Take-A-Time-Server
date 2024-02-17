import userCollection from "../../Modals/UserModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    // console.log("User ID:", userId);
    if (!userId)
      return res.json({ auth: false, message: "No User Logged In" });
    // Get the logged in user's information
    const user = await userCollection.findById(userId);

    return res.json({ auth: true, user });
  } catch (error) {
    console.log("Error getting user: " + error);
    return res.status(500).send({ msg: "" });
  }
};

export const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let checkUser = await userCollection.findOne({
      $or: [{ email }, { username }],
    });
    if (checkUser) {
      let errorMessage = "";
      if (checkUser.email === email) {
        errorMessage = "Email Already Exists!";
      }
      if (checkUser.username === username) {
        errorMessage = "Username Already Exists!";
      }
      console.log(errorMessage);
      return res.json({ status: 400, msg: errorMessage, login: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userCollection({
      username,
      email,
      password: hashedPassword,
    });

    newUser.save();
    //Generate and Send Token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);

    // console.log(req.session.userId,"res.session.userId");
    return res.json({
      newUser,
      msg: "User Registered Successfully",
      login: true,
      token,
    });
  } catch (error) {
    console.log(error, "error in Signup controller");
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await userCollection.findOne({ username });
    if (!userData) {
      console.log("User not registered !!");
      return res.json({
        status: 404,
        msg: "User not registered !!",
        login: false,
      });
    }

    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword) {
      return res.json({
        status: 401,
        msg: "Password does'nt matching !!",
        login: false,
      });
    }

    // req.session.userId = userData._id
    // req.session.isAuthenticated = true;
    const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    return res.json({ msg: "User logged Successfully", login: true, token });
  } catch (error) {
    // console.log(error,'LoginUser Server error');
    return res.status(500).json({ msg: "Server error" });
  }
};
export const logout = (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("token");
    console.log("user logged out successfully.");
    res.status(200).send({ msg: "user logged out successfully" });
  } catch (error) {
    console.log("Error signing out user: " + error);
    return res.status(500).send({ msg: "Couldn't log out." });
  }
};
