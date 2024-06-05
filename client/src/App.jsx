
import ChartForm from './ChartForm';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const App = () => {


  return (
    <div>
      <h1>Chart Generator</h1>
      <ChartForm />
    </div>
  );
};

export default App;
