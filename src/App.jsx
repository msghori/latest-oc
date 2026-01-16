import React, { useState, useEffect } from 'react'
import OrgChart from './components/OrgChart'

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load CSV data
    fetch(`${import.meta.env.BASE_URL}data.csv`)
      .then(response => response.text())
      .then(csvText => {
        // Parse CSV
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        
        const parsedData = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = [];
            let current = '';
            let inQuotes = false;
            
            for (let char of line) {
              if (char === '"') inQuotes = !inQuotes;
              else if (char === ',' && !inQuotes) {
                values.push(current);
                current = '';
              } else current += char;
            }
            values.push(current);
            
            const obj = {};
            headers.forEach((header, index) => {
              const value = values[index]?.trim();
              if (header === 'id') obj[header] = parseInt(value);
              else if (header === 'parentId') {
                obj[header] = (value && value !== '' && !isNaN(value)) ? parseInt(value) : '';
              }
              else obj[header] = value || '';
            });
            return obj;
          });
        
        setData(parsedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading CSV:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#0a0a0a',
        color: 'white',
        fontSize: '20px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="App" style={{ width: '100%', height: '100%' }}>
      <OrgChart data={data} />
    </div>
  )
}

export default App
