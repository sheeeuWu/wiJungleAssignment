import './App.css';
import ChartForm from './ChartForm';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const App = () => {


  return (
    <div>
      <h1 className='text-4xl font-bold font-sans text-center m-7'>Chart Generator</h1>
      <ChartForm />
    </div>
  );
};

export default App;
