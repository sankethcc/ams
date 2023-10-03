import React,{useState, useEffect} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  Title} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Piechart()
{
    
    return(
        <React.Fragment>
            <div className="container-fluid" style={{ height:30+"vh", width:45+"vh"}}>
            <div className="row">               
                <div className="col-md-5 mb-3 ">
            <Pie 
                 width={350}
                height={300}
                data={{                                          
                labels: ['Razor pay'],
                datasets: [
                    {
                      label: 'Amount',
                      data: [30],
                      backgroundColor: [
                        'rgba(94, 63, 190, 1)',  
                      ],
                      borderColor: [
                        'rgba(94, 63, 190, 1)',        
                      ],
                      borderWidth: 1,
                    
                      //hoverOffset:20
                    //   offset: [20,0,0,0,0,0,0,0,0,0]                     
                    },
                  ],
                 
            }}

            options={{                 
                responsive: true,         
                plugins:{
                    legend:{
                      position: 'right',
                      // labels:{
                      //   font:{size:13},
                      // }
                    }                        
                 },
                  
                             
               }}    
              style={{height:30+"vh"}}/>
            </div>
        </div>
    </div>
    </React.Fragment>
    );

}
export default Piechart;