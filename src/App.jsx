import React, { useState, useEffect } from 'react'
import OrgChart from './components/OrgChart'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/latest-oc/data.csv')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',');
        const parsed = lines.slice(1).map(line => {
          const values = line.split(',');
          const obj = {};
          headers.forEach((header, i) => {
            obj[header.trim()] = values[i]?.trim() || '';
          });
          return {
            id: parseInt(obj.id),
            name: obj.name,
            position: obj.position,
            department: obj.department,
            email: obj.email,
            phone: obj.phone,
            image: obj.image,
            country: obj.country,
            parentId: obj.parentId ? parseInt(obj.parentId) : null
          };
        });
        setData(parsed);
      });
  }, []);

  return (
    <div className="App" style={{ width: '100%', height: '100%' }}>
      <OrgChart data={data} />
    </div>
  )
}

export default App
