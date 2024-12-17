// import { DonationModel } from "@/models/Donation";
// import { ProfileInfoModel } from "@/models/ProfileInfo";
// import md5 from "md5";
// import mongoose from "mongoose";

// export async function createDonation(formData: FormData): Promise<string|false> {
//   const {amount, name, message, crypto, email} = Object.fromEntries(formData);
//   await mongoose.connect(process.env.MONGODB_URI as string);
//   const donationDoc = await DonationModel.create({
//     amount, name, message, crypto, email,
//   });
//   const profileInfoDoc = await ProfileInfoModel.findOne({email});
//   if (!profileInfoDoc) {
//     return false;
//   }

//   const endpoint = 'https://api.cryptomus.com/v1/payment';
//   const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY as string;
//   const data = {
//     amount: (parseInt(amount as string) * 5).toString() + '.00',
//     currency: 'USD',
//     order_id: donationDoc._id.toString(),
//     to_currency: (crypto as string).toUpperCase(),
//     // url_callback: 'https://23a1-94-255-134-174.ngrok-free.app/callback?id='+donationDoc._id,        https://00e6-2405-201-5009-202d-5957-e70d-9c1c-fa9c.ngrok-free.app/
//     url_return: process.env.NEXTAUTH_URL + '/' + profileInfoDoc.username,
//     url_success: process.env.NEXTAUTH_URL + '/' + profileInfoDoc .username + '?success=1',
//   };

//   const sign = md5(btoa(JSON.stringify(data)) + apiKey);
//   return '';
// }