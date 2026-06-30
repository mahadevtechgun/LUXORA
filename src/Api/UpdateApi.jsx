import axios from "axios";

export const cancelMyOrder = async (orderId) => {
  try {
    const customerId =
      localStorage.getItem("customer_id") || localStorage.getItem("user_id");

    const email = localStorage.getItem("user_email");

    const response = await axios.post(
      "https://efsolit.com/Headless/wp-json/custom/v1/cancel-order",
      {
        order_id: orderId,
        customer_id: customerId || "",
        email: email || "",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Cancel Order Response:", response.data);

    return response.data;
  } catch (error) {
    console.log("Cancel Order API Error:", error.response?.data || error.message);
    throw error;
  }
};