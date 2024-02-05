import fetch from "node-fetch";
import userCollectionModal from "../Modals/UserModal.js";


// const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";
  

 export const createOrder = async (data) => {
    // use the cart information passed from the front-end to calculate the purchase unit details
    // console.log(
    //   "shopping cart information passed from the frontend createOrder() callback:",
    //   data,
    // );
  
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
   
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
     
      },
      body:  JSON.stringify ({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: data.payment.cost,
            },
          },
        ],
      }),
    });
  
    return handleResponse(response);
  };
  
  /**
   * Capture payment for the created order to complete the transaction.
   *
   */
  export const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        
      },
    });

    // Database Update
  
    return handleResponse(response);
  };
//   ===========================
export const generateAccessToken = async () => {
    try {

        const PAYPAL_CLIENT_ID = 'ARrRpbrMk0jTTq236TMKSu6G1NG7HHq4MFGh-H2elOPUXTrsMLisPBo6UYsNAtz6Pn4hetix3z6V1TJf'
        const PAYPAL_CLIENT_SECRET = 'ELC7LZg8_m-XVbT_GJycuaGo9o5E6b1mqpuKxVDsIsI8VWk7KriZScDUx4JnE8wCf9iDVNLn08_tcYFn'
      if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        console.log("MISSING_API_CREDENTIALS");
      }
      const auth = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
      ).toString("base64");
      const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
      // console.log('=== Response from PayPal ===', response.status, response.statusText);

      const data = await response.json();
    // const data = await handleResponse(response);
    // console.log('\n','======================data.access_token======================', data, '\n','======================data.access_token======================');

      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
  };
  
  async function handleResponse(response) {
    try {

      if(response.status === 200 || response.status === 201){
    // console.log('=== response.status ====')

        return response.json()
      }
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  }

  export const savePayment = async (req,res) => {
    console.log('=============== savePayment =======================');

    try {
      const {data} = req.body
      const userId = req.user.userId;
      // console.log(data,'savePayment');
      const result = await userCollectionModal.findByIdAndUpdate(
        userId,
        {
          $set: {
            paymentDetails:data,
          },
        },
        { new: true } // to return the modified document
      );
  
      if (!result) {
        return res.json({ status: 404, msg: "User not found" });
      }
      console.log('Payment successfully done');
  
      return res.status(200).json({ msg: "Payment successfully done" ,status:'fulfilled' });
      
    } catch (error) {
      
    }
  }

