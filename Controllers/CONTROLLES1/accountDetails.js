import userCollectionModal from "../../Modals/UserModal.js";

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
    const { personalDetails, RouteDetails } = req.body.formData;


    const result = await userCollectionModal.findByIdAndUpdate(
      userId,
      {
        $set: {
          personalDetails,
          RouteDetails,
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


export const checkPaymentStatus = async (req, res) => {
  // console.log('isPaymentCompleted');
  try {
    const userId = req.user.userId;
    const user = await userCollectionModal.findById(userId);
    // console.log('user.paymentDetails',user.paymentDetails);

    if (!user) {
      return res.json({ status: 404, msg: "User not found" });
    }

    const isPaymentCompleted = user.paymentDetails && user.paymentDetails.status === "COMPLETED";
  console.log('isPaymentCompleted',isPaymentCompleted);

    if (isPaymentCompleted) {
  console.log('isPaymentCompleted',isPaymentCompleted);

      return res.json({ msg: "Payment status is COMPLETED", status: 'fulfilled' });
    } else {
      return res.json({ msg: "Payment status is not COMPLETED", status: 'pending' });
    }
    
  } catch (error) {
    console.log("Error in checking payment : ", error);
  }
}