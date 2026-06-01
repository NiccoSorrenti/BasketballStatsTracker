import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const PerformanceChart = ({ games }) => {
  const data = {
    labels: games.map((_, index) => `Game ${index + 1}`),

    datasets: [
      {
        label: 'Points',
        data: games.map((game) => Number(game.points)),
        borderColor: '#ffffff', // linea bianca
        backgroundColor: '#ffffff', // colore dei punti
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="card bg-dark p-4 border-0 shadow mt-4">
      <h3 className="text-white mb-4">Points Trend</h3>

      <Line data={data} options={options} />
    </div>
  );
};

export default PerformanceChart;
