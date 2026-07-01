  import axios from "axios";
  // product api
  export const getProduct=async()=>{
      try{
          const response = await axios.get("https://efsolit.com/Headless/wp-json/wc/store/products?per_page=100");
          return response.data;
      }catch(error){
          console.error("API Error:", error);
          throw error;
      }
  }

  // Categories api
  export const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://efsolit.com/Headless/wp-json/custom/v1/product-categories?per_page=100"
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };


  // shiiping api
  export const getShipping = async () => {
  try {
    const response = await axios.get(
      "https://efsolit.com/Headless/wp-json/wc/store/v1/cart"
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};


// order dasboard api

export const getMyOrders = async (customerId, email) => {
  try {
    console.log("Customer ID:", customerId);
    console.log("Email:", email);

    const response = await axios.get(
      "https://efsolit.com/Headless/wp-json/custom/v1/my-orders",
      {
        params: {
          customer_id: customerId || "",
          email: email || "",
        },
      }
    );

    console.log("Orders Response:", response.data);

    return response.data;
  } catch (error) {
    console.log("Orders API Error:", error.response?.data || error.message);
    throw error;
  }
};


export const getAccountDetails = async (userId) => {
  try {
    const response = await axios.get(
      "https://efsolit.com/Headless/wp-json/custom/v1/account-details",
      {
        params: {
          user_id: userId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Get Account API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


const BASE_URL = "https://efsolit.com/Headless/wp-json/custom/v1";

export const updateAccountDetails = async (formData) => {
  try {
    const userId =
      formData?.user_id ||
      localStorage.getItem("customer_id") ||
      localStorage.getItem("user_id") ||
      localStorage.getItem("id");

    if (!userId) {
      throw new Error("User ID not found. Please login again.");
    }

    const payload = {
      user_id: userId,
      name: formData?.name || "",
      email: formData?.email || "",
    };

    console.log("Update Account Payload:", payload);

    const response = await axios.post(
      `${BASE_URL}/update-account`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Update Account Response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Update Account API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// getUserAddresses
export const getUserAddresses = async (userId) => {
  const response = await axios.get(
    "https://efsolit.com/Headless/wp-json/custom/v1/get-addresses",
    {
      params: {
        user_id: userId,
      },
    }
  );

  return response.data;
};

export const saveUserAddresses = async (userId, addresses) => {
  const response = await axios.post(
    "https://efsolit.com/Headless/wp-json/custom/v1/save-addresses",
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
};

// // Featured Products API

export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(
      "https://efsolit.com/Headless/wp-json/custom/v1/featured-products"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Featured Products API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 
export const getVariation = async () => {
  try {
    const response = await axios.get(
      "https://efsolit.com/Headless/wp-json/custom/v1/products"
    );

    return response.data.products;

  } catch (error) {
    console.error(
      "Products API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};