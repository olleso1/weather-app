import React, { useEffect, useState } from "react";


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
        setData(json);
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
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Visa JSON-data */}
    </div>
  );
};

export default ApiPage;
