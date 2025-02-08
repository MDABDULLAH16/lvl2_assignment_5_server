/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"

export const initialPayment = async (paymentData:any) => {
   try {
    const response = await axios.post(process.env.PAYMENT_URL!, {
        store_id: process.env.STORE_ID,
        tran_id: paymentData.transactionId,
        signature_key: process.env.SIGNATURE_KEY,
        success_url: `https://sparkwave-server.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `https://sparkwave-server.vercel.app/api/payment/confirmation?status=faild`,
    cancel_url: "https://sparkwave-web.vercel.app",
        amount: paymentData.totalPrice,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: "N/A",
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode:"N/A",
        cus_country: "Bangladesh",
        cus_phone: "N/A",
        type: "json"
    });
    const result = response.data
    return result
    
   } catch (err) {
    throw new Error('payment initiation Error')
   }
    
}

export const verifyPayment = async (transId :string) => {
    try {
        const result = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
        params: {
            request_id: transId,
            signature_key: process.env.SIGNATURE_KEY,
            store_id: process.env.STORE_ID,
            type:"json"
        }
    })
    return result.data
    } catch (err) {
        throw new Error('Payment Verify Error')
    }
}