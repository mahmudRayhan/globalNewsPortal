import React from 'react';
import { Pie } from 'react-chartjs-2';



const PieChart = (props) =>{ 
    
    const data = {
        labels: props.options,
        datasets: [
          {
            label: '# of Votes',
            data: props.value,
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(55, 199, 132, 0.4)',
              'rgba(54, 162, 35, 0.4)',
              'rgba(255, 206, 186, 0.4)',
      
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
            
          },
        ],
      };
return(
  <div>
    <Pie data={data} 
   width={50}
   height={80}
   options={{ maintainAspectRatio: false }}/>
  </div>
);}

export default PieChart;