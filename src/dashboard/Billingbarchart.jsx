import React, {useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Barchart() {
//   const [socialName, setsocialName]= useState([]);
//   const [socialValue, setSocialValue]= useState([]);

//   useEffect( ()=>{

//     const socialMedianame=[];
//     const socialMedivalue=[];

//     const getSocialrecord= async()=>{
//       const dataReq= await fetch("http://localhost/reactgraphtutorial/socialmedia");
//       const dataRes= await dataReq.json();
//       //console.log(dataRes);

//       for(let i=0; i<dataRes.length; i++)
//       {
//         socialMedianame.push(dataRes[i].socialmedia_title);
//         socialMedivalue.push(dataRes[i].socialmedia_subscriber);

//       }
//       setsocialName(socialMedianame);
//       setSocialValue(socialMedivalue);
//  }
//   getSocialrecord();

//   },[]);

  
  return (
    <React.Fragment>
      <div className="container-fluid mb-5" >      
        <Chart
          type="bar"
          width={700}
          height={200}
          series={[
            {
             
              data: [2,1,7,3,1,5,3,7,5],
            },
          ]}
          options={{
            chart: {
                id: 'screenTimeChart',
                toolbar: {
                  show: true,
                  tools: {
                    zoomin: true,
                    zoomout: true,
                    pan: false,
                    reset: false,
                    download: false,
                    customIcons: [],
                  },
                },
              },
            // title: {
            //   text: "BarChar Developed by DevOps Team",
            //   style: { fontSize: 30 },
            // },

            // subtitle: {
            //   text: "This is BarChart Graph",
            //   style: { fontSize: 18 },
            // },

            colors: ["rgba(144, 241, 189, 1)"],
            // colors: ["red", "orange"],
            

            xaxis: {
              tickPlacement: "on",
              labels:{
                show: false,
              }
            //   categories: {
            //     ""
            //   },
            //   title: {
            //     text: "Social Media User",
            //     style: { color: "#f90000", fontSize: 30 },
            //   },
            },

            yaxis: {
                labels: {
                  formatter: (val) => {
                  return `${val}`;
                  },
                style: { fontSize: "15", colors: ["#f90000"] },
                show: false,
              },
            //      title: {
            //      text: "User In (K)",
            //      style: { color: "#f90000", fontSize: 15 },
            //   },
            },

            legend: {
              show: true,
              position: "right",
            },

            dataLabels: {
            //   formatter: (val) => {
            //     return `${val}`;
            //   },
            enabled:false,
              style: {
                colors: ["#f4f4f4"],
                fontSize: 15,
              },
            },
            grid: {
                show: false, // Hide grid lines behind the bars
              },
            //   zoom: {
            //     enabled: false, // Disable zoom in and zoom out
            //   },
          
          }}
        ></Chart>
      </div>
      {/* <style>
        {`
          .apexcharts-menu-icon.zoom-icon {
            display: none;
          }
        `}
      </style> */}
    </React.Fragment>
  );
}

export default Barchart;