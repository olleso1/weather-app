import React, { useEffect, useState } from "react";
import "./ApiPage.css"; // Importera CSS

const ApiPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://corsproxy.io/?url=https://informatik6.ei.hv.se/spelmaskinerapi/GetALL"
        );
        if (!res.ok) {
          throw new Error("API-fel");
        }
        const json = await res.json();
        setData(json.value); // Uppdatera endast "value" eftersom det innehåller listan
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Laddar data...</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <div className="api-page">
      <h1>API Data</h1>
      <table className="api-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Namn</th>
            <th>Beskrivning</th>
            <th>Highscore</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.highscore}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiPage;
