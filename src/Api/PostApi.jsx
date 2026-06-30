import axios from "axios";


// Login API
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      "https://efsolit.com/Headless/wp-json/jwt-auth/v1/token",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const loginData = response.data;
    const token = loginData?.token;

    if (!token) {
      throw new Error("Token not received");
    }

    const userResponse = await axios.get(
      "https://efsolit.com/Headless/wp-json/wp/v2/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userData = userResponse.data;

    return {
      ...loginData,
      user_id: userData?.id,
      customer_id: userData?.id,
      user_email: userData?.email || loginData?.user_email,
      user_display_name: userData?.name || loginData?.user_display_name,
      user: userData,
    };
  } catch (error) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw error;
  }
};

// Register API
export const registeruser = async (username, email, password) => {
  try {
    const response = await axios.post(
      "https://efsolit.com/Headless/wp-json/custom/v1/register",
      {
        username,
        email,
        password,
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
      "Register API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// Forgot Password API
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      "https://efsolit.com/Headless/wp-json/custom/v1/forgot-password",
      {
        email,
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
      "Forgot Password API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// newsletterSubscribe

export const newsletterSubscribe = async (email) => {
  try {
    const response = await axios.post(
      "https://efsolit.com/Headless/wp-json/custom/v1/newsletter",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Newsletter API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// contact form
export const sendContactMessage = async (formData) => {
  try {
    const response = await axios.post(
      "https://efsolit.com/Headless/wp-json/custom/v1/contact",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Contact API Error:", error.response?.data || error.message);
    throw error;
  }
};

