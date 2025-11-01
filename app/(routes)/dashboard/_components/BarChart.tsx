import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  type: string;
  chartData: number[];
}

const BarChart = ({ type, chartData }: BarChartProps) => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: type,
        data: chartData,
        backgroundColor: "rgba(29, 100, 186, 0.7)",
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 10,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
        border: { display: false },
        categoryPercentage: 0.6,
        barPercentage: 0.5,
      },
      y: {
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
        border: { display: false },
      },
    },
  };

  return <Bar data={data} options={options} className="h-full" />;
};

export default BarChart;
