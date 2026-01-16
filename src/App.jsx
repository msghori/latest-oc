import React, { useState, useEffect } from 'react'
import OrgChart from './components/OrgChart'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Check authentication
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      const basePath = window.location.pathname.includes('/latest-oc/') ? '/latest-oc/' : '/';
      window.location.replace(basePath + 'login.html');
      return;
    }

    const basePath = import.meta.env.BASE_URL;
    fetch(`${basePath}data.csv`)
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
            reportTo: obj.reportTo,
            parentId: obj.parentId ? parseInt(obj.parentId) : null
          };
        });
        
        // Calculate total subordinates for each person
        const countSubordinates = (personId) => {
          const directReports = parsed.filter(p => p.parentId === personId);
          let total = directReports.length;
          directReports.forEach(report => {
            total += countSubordinates(report.id);
          });
          return total;
        };
        
        const dataWithCounts = parsed.map(person => ({
          ...person,
          _totalSubordinates: countSubordinates(person.id)
        }));
        
        setData(dataWithCounts);
      });
  }, []);

  return (
    <div className="App" style={{ width: '100%', height: '100%' }}>
      <OrgChart data={data} />
    </div>
  )
}

export default App
