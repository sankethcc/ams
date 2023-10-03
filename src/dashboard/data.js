export const studentData = {
    requests: 30,
    documentVerification: 20,
    sendCode: 15,
    totalCoupons: 1200,
    totalUsers: "3 lakh",
    activeUsers: "1.2 lakh",
    totalBilling: "3 lakh",
    activeSub: "55 k",
    expiredSub:"800",
    values : [5, 1, 0, 5, 3, 2, 4]

  };
  
  export const teacherData = {
    requests: 40,
    documentVerification: 25,
    sendCode: 18,
    totalCoupons: 1500,
    totalUsers: "2.8 lakh",
    activeUsers: "1.1 lakh",
    totalBilling: "2.8 lakh",
    activeSub: "10 k",
    expiredSub:"200",
    values : [5, 0, 7, 0, 3, 2, 4]

  };
  
  export const parentData = {
    requests: 20,
    documentVerification: 12,
    sendCode: 8,
    totalCoupons: 900,
    totalUsers: "2 lakh",
    activeUsers: "90000",
    totalBilling: "2 lakh",
    activeSub: "51 k",
    expiredSub:"700",
    values : [1, 6, 7, 0, 3, 2, 4]

  };
  
  export const managementData = {
    requests: 50,
    documentVerification: 30,
    sendCode: 20,
    totalCoupons: 1800,
    totalUsers: "3.2 lakh",
    activeUsers: "1.3 lakh",
    totalBilling: "3.2 lakh",
    activeSub: "15 k",
    expiredSub:"91",    
    values : [5, 6, 7, 0, 3, 2, 4]

  };
  
  export const totalData = {
    requests:
      studentData.requests +
      teacherData.requests +
      parentData.requests +
      managementData.requests,
    documentVerification:
      studentData.documentVerification +
      teacherData.documentVerification +
      parentData.documentVerification +
      managementData.documentVerification,
    sendCode:
      studentData.sendCode +
      teacherData.sendCode +
      parentData.sendCode +
      managementData.sendCode,
    totalCoupons:
      studentData.totalCoupons +
      teacherData.totalCoupons +
      parentData.totalCoupons +
      managementData.totalCoupons,
    totalUsers: "8.3 lakh", 
    activeUsers: "3.6 lakh", 
    totalBilling: "8 lakh", 
    activeSub: "1.31 lakh",
    expiredSub:"800",
    values : [5, 6, 7, 2, 6, 7, 4]
  };
  

 export const dummyUserData = [
    {
      id: 1,
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: 2,
      email: "user@example.com",
      password: "user123",
      role: "user",
    },
    {
      id: 3,
      email: "teacher@example.com",
      password: "teacher123",
      role: "teacher",
    },
  ];


export  const dataPoints = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
