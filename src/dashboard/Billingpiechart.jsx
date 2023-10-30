import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  Title} from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Piechart()
{
    
    return(
        <React.Fragment>
            <div className="container-fluid b-radius1" style={{padding:'40px', background:'#fff'}}>

            <div className="row">               
                <div>
                <h3 className="font-main2">Sourcse</h3>
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
                    
                      hoverOffset:20,
                      offset: [20,0,0,0,0,0,0,0,0,0]                     
                    },
                  ],
                 
            }}

            options={{                 
                responsive: true,         
                plugins:{
                    legend:{
                      position: 'right',
                      labels:{
                        font:{size:13},
                      }
                    }                        
                 },
                  
                             
               }}    
              style={{height:30+"vh"}}
              />
            </div>
        </div>
    </div>
    </React.Fragment>
    );

}
export default Piechart;