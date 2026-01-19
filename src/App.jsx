import React, { useState, useEffect } from "react";
import OrgChart from "./components/OrgChart";
import Login from "./components/Login";

function App() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!loggedIn);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    // const basePath = import.meta.env.BASE_URL;
    //   fetch(`${basePath}data.csv`)
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUs76BdMJ33f9skcC0mUz8KtnKIyQuh1iaxwPm2asZrKOaC0MTaCVQewz8pLmXwhpT43mZobvpvcxZ/pub?output=csv"
    )
      .then((response) => response.text())
      .then((text) => {
        const lines = text.split("\n").filter((line) => line.trim());
        const headers = lines[0].split(",");
        const parsed = lines.slice(1).map((line) => {
          const values = line.split(",");
          const obj = {};
          headers.forEach((header, i) => {
            obj[header.trim()] = values[i]?.trim() || "";
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
            parentId: obj.parentId ? parseInt(obj.parentId) : null,
          };
        });

        // Calculate total subordinates for each person
        const countSubordinates = (personId) => {
          const directReports = parsed.filter((p) => p.parentId === personId);
          let total = directReports.length;
          directReports.forEach((report) => {
            total += countSubordinates(report.id);
          });
          return total;
        };

        const dataWithCounts = parsed.map((person) => ({
          ...person,
          _totalSubordinates: countSubordinates(person.id),
        }));

        setData(dataWithCounts);
      });
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <OrgChart data={data} />
    </div>
  );
}

export default App;
