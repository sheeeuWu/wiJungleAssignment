import  { useEffect, useState } from "react";
import { Bar, Pie,Line, Doughnut, PolarArea, Radar } from "react-chartjs-2";
import axios from 'axios'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
} from "chart.js";
import "./chartForm.css"


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
);


const ChartForm = () => {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("");


  const processData = (labels, values, charts, height, width) => {
    
    const chartData = {
      labels,
      datasets: [
        {
          label: "Dataset",
          data: values,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          
        },
      ],
    };

    setChartData({ chartData, charts, height, width });
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };
  

  //char.js 
  const PieOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Pie Chart",
      },
    },
  }; 
  const LineOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
  };
  const BarOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart",
      },
    },
  };

  const DoughnutOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doughnut Chart",
      },
    },
  };
  const PolarOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Polar Chart",
      },
    },
  };
  const RadarOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Radar Chart",
      },
    },
  };  


  //api 
  useEffect(() => {
      console.log('inside axios');
      axios.get('http://localhost:5000/getdata')
      .then((response) => {
          const graphData = response.data[0]
          console.log('Saved Data ', graphData);
          processData(graphData.months, graphData.sales, graphData.charts, graphData.height, graphData.width)
        })
        .catch((error) => {
          console.error('There was an error saving the data!', error);
        });
  }, []);
  console.log("data", chartData, chartType);



  
  return (
    <div className="text-center font-sans">
      <select className="border-2 border-[#f4a8b8] rounded mb-6 mr-10" value={chartType} onChange={handleChartTypeChange}>
        <option className="bg-[#f4a8b8]"  value="">Select Chart Type</option>
        {chartData?.charts.map((chart) => (
          <option key={chart} value={chart}>{chart.charAt(0).toUpperCase() + chart.slice(1)} Chart</option>
        ))}
      </select>
      <div className="chart-dimension" style={{ height: chartData?.height, width: chartData?.width }}>
        {chartData && chartType === "pie" && (
        <Pie options={PieOption} data={chartData.chartData} />
        )}
        {chartData && chartType === "bar" && (
          <Bar options={BarOption} data={chartData.chartData} />
        )}
        {chartData && chartType === "line" && (
          <Line options={LineOption} data={chartData.chartData} />
        )}
        {chartData && chartType === "doughnut" && (
          <Doughnut options={DoughnutOption} data={chartData.chartData} />
        )}
        {chartData && chartType === "polar" && (
          <PolarArea options={PolarOption} data={chartData.chartData} />
        )}
        {chartData && chartType === "radar" && (
          <Radar options={RadarOption} data={chartData.chartData} />
        )}
      </div>
    </div>
  );
};

export default ChartForm;
