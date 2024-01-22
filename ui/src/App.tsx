// gas-price-tracker-ui/src/App.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

interface GasPrice {
  _id: string;
  value: number;
  timestamp: string;
}

function App() {
  const [gasPrices, setGasPrices] = useState<GasPrice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<GasPrice[]>('http://localhost:5000/gas-prices');
        console.log('HTML Content:', response.data);

        console.log('Response from API:', response.data);
        setGasPrices(response.data);
      } catch (error) {
        console.error('Error fetching gas prices:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <h1>Gas Price Tracker</h1>
      {gasPrices.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Gas Price</th>
            </tr>
          </thead>
          <tbody>
            {gasPrices.map((gasPrice) => (
              <tr key={gasPrice._id}>
                <td>{new Date(gasPrice.timestamp).toLocaleString()}</td>
                <td>${gasPrice.value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No gas price data available.</p>
      )}
    </div>
  );
}

export default App;
