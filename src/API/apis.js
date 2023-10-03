import axios from 'axios';

const apiUrl = 'http://127.0.0.1:5000'; // Replace with your API URL

export const getTotalUsers = () => {
    return axios.get(`${apiUrl}/get_all_platform/users`)
      .then((response) => {
        return response.data; // Return the response data
      })
      .catch((error) => {
        throw error; // Handle errors
      });
  };

// Fetch all users on the platform
export const getAllPlatformUsers = () => {
  return axios.get(`${apiUrl}/get_all_platform/users`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Fetch all users on the platform
export const getAllStudents = () => {
  return axios.get(`${apiUrl}/get_all_students`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};// Fetch all users on the platform
export const getAllTeachers = () => {
  return axios.get(`${apiUrl}/get_all_teachers`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};// Fetch all users on the platform
export const getAllParents = () => {
  return axios.get(`${apiUrl}/get_all_parents`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};
// Fetch all users on the platform
export const getAllmanagement = () => {
  return axios.get(`${apiUrl}/get_all_managements`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};
// Edit user details by user ID
export const editUserDetails = (userId, userFormData) => {
  return axios.put(`${apiUrl}/edit_user/${userId}`, userFormData)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Block or Unblock a user by email
export const blockOrUnblockUser = (email) => {
  return axios.put(`${apiUrl}/block_user/${email}`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Fetch all coupons
export const getAllCoupons = () => {
  return axios.get(`${apiUrl}/get_all_coupon`);
};

// Create a new coupon
export const createCoupon = (couponData) => {
  return axios.post(`${apiUrl}/generate_coupon`, couponData)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Update an existing coupon by ID
export const updateCoupon = (couponId, couponData) => {
  return axios.put(`${apiUrl}/update_coupon/${couponId}`, couponData)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Delete a coupon by ID
export const deleteCoupon = (couponId) => {
  return axios.delete(`${apiUrl}/delete_coupon/${couponId}`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Fetch all subscriptions
export const getSubscriptions = () => {
  return axios.get(`${apiUrl}/subscriptions`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Fetch a single subscription by ID
export const getSubscriptionById = (subscriptionId) => {
  return axios.get(`${apiUrl}/subscription/${subscriptionId}`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Create a new subscription
export const createSubscription = (subscriptionData) => {
  return axios.post(`${apiUrl}/create_subscription`, subscriptionData)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Update an existing subscription by ID
export const updateSubscription = (subscriptionId, subscriptionData) => {
  return axios.put(`${apiUrl}/update_subscription/${subscriptionId}`, subscriptionData)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Delete a subscription by ID
export const deleteSubscription = (subscriptionId) => {
  return axios.delete(`${apiUrl}/delete_subscription/${subscriptionId}`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

