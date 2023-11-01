

export const studentData = {
    requests: 0,
    documentVerification: 0,
    sendCode: 15,
    totalCoupons: 1200,
    totalUsers: "3 lakh",
    activeUsers: "1.2 lakh",
    totalBilling: "0",
    activeSub: "55 k",
    expiredSub:"800",
    values : [5, 1, 0, 5, 3, 2, 4]

  };
  
  export const teacherData = {
    requests: 0,
    documentVerification: 25,
    sendCode: 18,
    totalCoupons: 1500,
    totalUsers: "2.8 lakh",
    activeUsers: "1.1 lakh",
    totalBilling: "0",
    activeSub: "10 k",
    expiredSub:"200",
    values : [5, 0, 7, 0, 3, 2, 4]

  };
  
  export const parentData = {
    requests: 0,
    documentVerification: 12,
    sendCode: 8,
    totalCoupons: 900,
    totalUsers: "2 lakh",
    activeUsers: "0",
    totalBilling: "0",
    activeSub: "51 k",
    expiredSub:"700",
    values : [1, 6, 7, 0, 3, 2, 4]

  };
  
  export const managementData = {
    requests: 0,
    documentVerification: 30,
    sendCode: 20,
    totalCoupons: 1800,
    totalUsers: "0",
    activeUsers: "1.3 lakh",
    totalBilling: "0",
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
    totalBilling: "0", 
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


export  const dataPoints = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
