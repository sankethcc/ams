import axios from 'axios';
import { useSnackbar } from 'notistack';

export const Error = ({errorName}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
return enqueueSnackbar(`${errorName}`, { variant: 'error' })
}
export const Success = ({successName}) =>{
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
     enqueueSnackbar(`${successName}`, { variant: 'success' })
  )
}


export const apiUrl = 'http://localhost:5000/'; // Replace with your API URL

export const login = (Data) => {
  return axios.post(`${apiUrl}/login`, Data)
    .then((response) => {
      return response.data; // Return the response data
      
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};
// send code
export const sendcode = (formData) => {
  return axios.post(`${apiUrl}/send-document-verification-code`, formData)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

//resend
export const resendcode = (formData) => {
  return axios.post(`${apiUrl}/resend-document-verification-code`, formData)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

export const getTotalUsers = () => {
    return axios.get(`${apiUrl}/get_all_platform/users`)
      .then((response) => {
        return response.data; // Return the response data
      })
      .catch((error) => {
        throw error; // Handle errors
      });
  };

export const getdocument = (id) => {
    return axios.get(`${apiUrl}/get_document/${id}`)
      .then((response) => {
        return response; // Return the response data
      })
      .catch((error) => {
        throw error; // Handle errors
      });
};
  
// Get pending request
export const getpending = () => {
    return axios.get(`${apiUrl}/get-unverified-documents`)
      .then((response) => {
        return response.data; // Return the response data
      })
      .catch((error) => {
        throw error; // Handle errors
      });
};

// verify document
export const verify = (subscriptionData) => {
  return axios.post(`${apiUrl}/verify-document`, subscriptionData)
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
  return axios.get(`${apiUrl}/get_all_platform/users/student`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};// Fetch all users on the platform
export const getAllTeachers = () => {
  return axios.get(`${apiUrl}/get_all_platform/users/teacher`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};// Fetch all users on the platform
export const getAllParents = () => {
  return axios.get(`${apiUrl}/get_all_platform/users/parent`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};
// Fetch all users on the platform
export const getAllmanagement = () => {
  return axios.get(`${apiUrl}/get_all_platform/users/management`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

export const getManagement = (id) => {
    return axios.get(`${apiUrl}/get_management/${id}`)
      .then((response) => {
        return response.data; // Return the response data
      })
      .catch((error) => {
        throw error; // Handle errors
      });
  };
// Edit user details by user ID
export const editUserDetails = (userId, role, userFormData) => {
  return axios.put(`${apiUrl}/edit_user/${userId}/${role}`, userFormData)
    .then((response) => {
      return response.data; // Return the response data

    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Block or Unblock a user by email
export const blockOrUnblockUser = (_id, role) => {
  return axios.put(`${apiUrl}/block_user/${_id}/${role}`)
    .then((response) => {
      return response.data; // Return the response data
    })
    .catch((error) => {
      throw error; // Handle errors
    });
};

// Fetch all coupons
export const getAllCoupons = async () => {
  return axios.get(`${apiUrl}/get_all_coupon`);
};

// Get single Coupon
export const getSingleCoupons = async (id) => {
  return axios.get(`${apiUrl}/get_single_coupon/${id}`);
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

