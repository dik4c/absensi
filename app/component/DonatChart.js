import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const DonatChart = ({ data }) => {
  const options = {
    plugins: {
      legend: {
        display: true, // Menampilkan Legend
        position: "bottom", // Menentukan posisi Legend (top, bottom, left, right)
        align: "center", // Menentukan alignment Legend (start, center, end)
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
    },
  };
  return (
    <div className="w-full flex justify-center py-[20px]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonatChart;
