import userCollectionModal from "../Modals/UserModal.js";

// export const UploadDetails = async (req, res) => {
//     console.log(UploadDetails,'UploadDetails');
//     try {
//         const userId = req.user.userId;
//         console.log(userId,'userId');

//         const {formData} = req.body
//         const currentUser = userCollectionModal.findOne()
//         // console.log(formData);

// Update the current user's data
// currentUser.personalDetails = personalDetails;
// currentUser.routeDetails = routeDetails;
// currentUser.paymentDetails = paymentDetails;

// Save the updated user
// await currentUser.save();
//     } catch (error) {

//     }
// }
export const UploadDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { personalDetails, RouteDetails, paymentDetails } = req.body.formData;
    console.log(paymentDetails,'paymentDetails');
    const result = await userCollectionModal.findByIdAndUpdate(
      userId,
      {
        $set: {
          personalDetails,
          RouteDetails,
          paymentDetails,
        },
      },
      { new: true } // to return the modified document
    );

    if (!result) {
      return res.json({ status: 404, msg: "User not found" });
    }

    return res.status(200).json({ msg: "Details uploaded successfully" ,status:'fulfilled' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
