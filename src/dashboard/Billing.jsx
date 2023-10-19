import React, { useState, useEffect } from "react";
import "./css/syyle.css";
import VectorImage from "./img/vector.svg";
import Profile from "./img/rectangle-54.png";
import Piechart from "./Billingpiechart";
import Barchart from "./Billingbarchart";
import BScreenTimeChart from "./BillingScreenTime";
import SideNav from "./SideNav";
import Head from "./Head";

const Billing = () => {
  return (
    <div className="screen">
      <SideNav xyz={"billing"} />
      <div style={{ width: "85%", padding: "24px 45px" }}>
        <Head pageName="Billing" />

        <div className="main">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "4fr 8fr",
              gridGap: "32px",
            }}
          >
            <div className="billing_text-wrapper">
              <div className=" font-main2">Total amount</div>
              <div className="font-main1">$ 2.5 lakh</div>

              <div className="font-main2">Total users</div>
              <div className="font-main1">5 lakh</div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  textAlign: "center",
                  gap: "10px",
                }}
              >
                <div className="billing_text-wrapper-5 b-radius1">
                  <div className="font-main2">Total Users</div>
                  <div className="font-main1">5 lakh</div>
                </div>

                <div className="billing_text-wrapper-5 b-radius1">
                  <div className="font-main2">Total Users</div>
                  <div className="font-main1">5 lakh</div>
                </div>
              </div>
            </div>

            <div style={{ width: "100%" }} className="outer-group-2 b-radius1">
              <BScreenTimeChart />
            </div>
            <Piechart />
            <div style={{ width: "100%" }} className="outer-group-2 b-radius1">
              <Barchart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
