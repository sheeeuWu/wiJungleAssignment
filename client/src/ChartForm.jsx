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
    <div className="text-center font-sans">
      <label  className="custom-file-upload font-sans">
        <input className="mb-6 mr-10" id="file-upload" type="file" accept=".csv" onChange={handleFileChange} />
        Custom Upload
      </label>
      <select className="border-2 border-[#f4a8b8] rounded mb-6 mr-10" value={chartType} onChange={handleChartTypeChange}>
        <option className="bg-[#f4a8b8]"  value="">Select Chart Type</option>
        <option className=""  value="pie">Pie Chart</option>
        <option className=""  value="line">Line Chart</option> 
        <option className=""  value="bar">Bar Graph</option>
        <option className=""  value="doughnut">Doughnut Chart</option> 
        <option className=""  value="polar">Polar Chart</option> 
        <option className=""  value="radar">Radar Chart</option> 
      </select>
      {chartData && chartType === "pie" && 
      <Pie options={PieOption} data={chartData} />}
      {chartData && chartType === "bar" && (
        <Bar options={BarOption} data={chartData} />
      )}
      {chartData && chartType === "line" && (
        <Line options={LineOption} data={chartData} />
      )}
      {chartData && chartType === "doughnut" && (
        <Doughnut options={DoughnutOption} data={chartData} />
      )}
      {chartData && chartType === "polar" && (
        <PolarArea options={PolarOption} data={chartData} />
      )}
      {chartData && chartType === "radar" && (
        <Radar options={RadarOption} data={chartData} />
      )}
    </div>
  );
};

export default ChartForm;
