import { auth } from '@/configs/auth';
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // Title,
  Tooltip
  // Legend
);

export const options = {
  tension: 0.4,

  responsive: true,
  plugins: {
    line: {
      width: 3,
    },
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

export function Chart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchPatientData() {
      try {
        const query = await fetch(
          'https://fedskillstest.coalitiontechnologies.workers.dev',
          {
            headers: {
              Authorization: `Basic ${auth}`,
            },
          }
        );
        const data = await query.json();
        if (data) {
          const targetPatientIndex = data.findIndex((x) =>
            x.name.toLowerCase().startsWith('jessica')
          );
          if (targetPatientIndex !== -1) {
            setChartData(
              data[targetPatientIndex].diagnosis_history.splice(0, 6).reverse()
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPatientData();
  }, []);

  const data = {
    labels:
      chartData && chartData.length > 0
        ? chartData.map((item) => item.month)
        : [],
    datasets: [
      {
        label: 'Systolic',
        data:
          chartData &&
          chartData.map((item) => item.blood_pressure.systolic.value),
        borderColor: 'rgba(236, 72, 153, 0.25)',
        backgroundColor: 'rgba(236, 72, 153, 1)',
      },
      {
        label: 'Diastolic',
        data:
          chartData &&
          chartData.map((item) => item.blood_pressure.diastolic.value),
        borderColor: 'rgba(168, 85, 247, 0.25)',
        backgroundColor: 'rgba(168, 85, 247, 1)',
      },
    ],
  };

  return chartData && chartData.length > 0 ? (
    <Line options={options} data={data} />
  ) : null;
}
