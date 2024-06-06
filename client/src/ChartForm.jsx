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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvData = event.target.result;
      processData(csvData);
    };
    reader.readAsText(file);
  };

  const processData = (csvData) => {
    const rows = csvData.split("\n");
    const labels = [];
    const values = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].split(",");
      if (row.length >= 2) {
        labels.push(row[0]);
        values.push(parseInt(row[1]));
      }
    }
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
    setChartData(chartData);
  };

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
    
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const Lineoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  useEffect(() => {
    if (chartData && chartType !== '') {
      console.log('inside axios');
      axios.post('http://localhost:5000/savedata', { chartData, chartType })
        .then((response) => {
          console.log('response is ', response);
        })
        .catch((error) => {
          console.error('There was an error saving the data!', error);
        });
    }
  }, [chartData, chartType]);
  console.log("data", chartData, chartType);

  useEffect(() => {
      console.log('inside axios');
      axios.get('http://localhost:5000/getdata')
        .then((response) => {
          console.log('Saved Data ', response);
        })
        .catch((error) => {
          console.error('There was an error saving the data!', error);
        });
  }, []);
  console.log("data", chartData, chartType);
  
  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <select value={chartType} onChange={handleChartTypeChange}>
        <option value="">Select Chart Type</option>
        <option value="bar">Bar Graph</option>
        <option value="pie">Pie Chart</option>
        <option value="line">Line Chart</option> 
        <option value="doughnut">Doughnut Chart</option> 
        <option value="polar">Polar Chart</option> 
        <option value="radar">Radar Chart</option> 
        {/* Add more chart types as needed */}
      </select>
      {chartData && chartType === "pie" && <Pie data={chartData} />}
      {chartData && chartType === "bar" && (
        <Bar options={options} data={chartData} />
      )}
      {chartData && chartType === "line" && (
        <Line options={Lineoptions} data={chartData} />
      )}
      {chartData && chartType === "doughnut" && (
        <Doughnut data={chartData} />
      )}
      {chartData && chartType === "polar" && (
        <PolarArea data={chartData} />
      )}
      {chartData && chartType === "radar" && (
        <Radar data={chartData} />
      )}
    </div>
  );
};

export default ChartForm;
