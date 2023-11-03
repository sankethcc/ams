import React, { useEffect, useState } from "react";
import "./css/syyle.css";
import Piechart from "./Billingpiechart";
import Barchart from "./Billingbarchart";
import BScreenTimeChart from "./BillingScreenTime";
import SideNav from "./SideNav";
import Head from "./Head";
import { getBillingData } from "../API/apis";

const Billing = () => {
  const [allData, setAllData] = useState()
  const [graphData, setGraphData] = useState()
  const [barGraphData, setBarGraphData] = useState()
  useEffect(()=>{
    let dataPoint = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    getBillingData()
    .then((data)=>{
      const screenGraph = data[0]
      const barGraph = data[1]

      const orderedData = dataPoint.map(day => ({
        day,
        value: screenGraph[day] || 0, // Set the value from the API response, or default to 0
      }));
      const orderBarGraph = dataPoint.map(day =>({
        day,
        value:barGraph[day] || 0
      }))
      const barGraphValues = orderBarGraph.map(data=>data.value)
      const graphValues = orderedData.map(data=>data.value)

      setGraphData(graphValues)
      setBarGraphData(barGraphValues)
      setAllData(screenGraph)
    })
    .catch((error)=>{
      console.log(error)

    })
  },[])



  return (
    <div className="screen">
      <SideNav xyz={"billing"} />
      <div style={{ width: "85%", padding: "24px 45px" }}>
        <Head pageName="Billing" />

        <div className="main">
          <div  className="billing-wrapper">
            <div className="billing_text-wrapper billing-data1">
              <div className=" font-main2">Total amount</div>
              <div className="font-main1">₹ {allData?.total_amount}</div>

              <div className="font-main2">Total users</div>
              <div className="font-main1">{allData?.total_user}</div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  textAlign: "center",
                  gap: "10px",
                }}
              >
                <div className="billing_text-wrapper-5 b-radius1">
                  <div className="font-main2">Active User</div>
                  <div className="font-main1">{allData?.active}</div>
                </div>

                <div className="billing_text-wrapper-5 b-radius1">
                  <div className="font-main2">Inactive Users</div>
                  <div className="font-main1">{allData?.inactive}</div>
                </div>
              </div>
            </div>

            <div  className="outer-group-2 b-radius1 billing-data2">
              <BScreenTimeChart activeData = {graphData} />
            </div>
            <div  className=" billing-data1">
            <Piechart />

            </div>
            <div  className="outer-group-2 b-radius1 billing-data2">
              <Barchart activeData = {barGraphData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
