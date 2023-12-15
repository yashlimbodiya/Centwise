import React, { useState, useEffect } from 'react';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styles from "./ChartModal.module.css";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

interface ChartModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ChartModal: React.FC<ChartModalProps> = ({ isVisible, onClose }) => {
  console.log('isVisible:', isVisible);

  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['#00CE67', '#ffa500', '#FFE347'],   // Green, Orange, Yellow
      },
      {
        data: [5, 15, 25],
        backgroundColor: ['#D81E5B', '#731DD8', '#FAEDCA'], // Pink, Violet, White
      },
    ],
    labels: ['#00CE67', '#FFE347', '#ffa500'],
  });

  useEffect(() => {
    const fetchData = () => {
      console.log('Fetching data...');
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((data) => data.json())
        .then((res) => {
          console.log('Fetched data:', res);
          const label = [];
          const data = [];
          for (var i of res) {
            label.push(i.name);
            data.push(i.id);
          }
          setChartData({
            datasets: [
              {
                data: data,
                backgroundColor: ['#00CE67', '#ffa500', '#FFE347'],
              },
              {
                data: data.map((item) => item * 2),
                backgroundColor: ['#D81E5B', '#731DD8', '#FAEDCA'],
              },
            ],
            labels: label,
          });
        })
        .catch((e) => {
          console.log('Error fetching data:', e);
        });
    };

    fetchData();
  }, []);

  return (
    <div className={`${styles.modalOverlay} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {/* First Pie chart */}
        <h2>You owe</h2>
        <div className={styles.chartContainer}>
          <Pie data={{ datasets: [chartData.datasets[0]], labels: chartData.labels }} />
        </div>
        <br/>
        {/* Second Pie chart */}
        <h2>You are owed</h2>
        <div className={styles.chartContainer}>
          <Pie data={{ datasets: [chartData.datasets[1]], labels: chartData.labels }} />
        </div>
      </div>
    </div>
  );
};

export default ChartModal;