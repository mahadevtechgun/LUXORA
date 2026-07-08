import axios from "axios";

const API = "https://efsolit.com/Headless/wp-json/custom/v1";

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API}/countries`);
    return response.data;
  } catch (error) {
    console.error("Countries API Error:", error);
    throw error;
  }
};

export const getStates = async (country = "IN") => {
  try {
    const response = await axios.get(`${API}/states/${country}`);
    return response.data;
  } catch (error) {
    console.error("States API Error:", error);
    throw error;
  }
};

export const getShippingRates = async (payload) => {
  try {
    const response = await axios.post(`${API}/shipping-rates`, payload);
    return response.data;
  } catch (error) {
  console.log("Shipping Error Data:", error.response?.data);
  console.log("Shipping Error Status:", error.response?.status);
  throw error;
}
};

export const placeOrderApi = async (payload) => {
  try {
    const response = await axios.post(`${API}/place-order`, payload);
    return response.data;
  } catch (error) {
    console.error("Place Order API Error:", error);
    throw error;
  }
};

export const applyCouponApi = async (payload) => {
  try {
    const response = await axios.post(`${API}/apply-coupon`, payload);
    return response.data;
  } catch (error) {
    console.error("Coupon API Error:", error);
    throw error;
  }
};


// coupons
export const getCouponsApi = async () => {
  try {
    const response = await axios.get(
      "https://efsolit.com/Headless/wp-json/custom/v1/coupons"
    );

    return response.data;
  } catch (error) {
    console.error("Coupons API Error:", error.response?.data || error.message);
    throw error;
  }
};

// wishlist and cart not remove other system 

export const saveCartApi = async (items, token) => {
  const response = await axios.post(
    `${API}/save-cart`,
    { items },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getCartApi = async (token) => {
  const response = await axios.get(
    `${API}/get-cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const saveWishlistApi = async (items, token) => {
  const response = await axios.post(
    `${API}/save-wishlist`,
    { items },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getWishlistApi = async (token) => {
  const response = await axios.get(
    `${API}/get-wishlist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
// Review
export const getProductReviewsApi = async (productId) => {
  const response = await axios.get(`${API}/product-reviews/${productId}`);
  return response.data;
};

export const submitReviewApi = async (payload) => {
  const response = await axios.post(
    `${API}/submit-review`,
    payload
  );

  return response.data;
};

// address api // User Addresses
export const getUserAddresses = async (userId) => {
  try {
    const response = await axios.get(`${API}/get-addresses`, {
      params: {
        user_id: userId,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Get Addresses API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const saveUserAddresses = async (userId, addresses) => {
  try {
    const response = await axios.post(
      `${API}/save-addresses`,
      {
        user_id: userId,
        addresses,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Save Addresses API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};