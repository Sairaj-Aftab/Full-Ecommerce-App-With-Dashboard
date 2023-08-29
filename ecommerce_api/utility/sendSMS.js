import axios from "axios";

export const sendOTP = async (number, sms) => {
  try {
    await axios.get(
      `https://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API_KEY}&type=text&number=${number}&senderid=${process.env.SMS_SENDER_ID}&message=${sms}`
    );
  } catch (error) {
    console.log(error);
  }
};
