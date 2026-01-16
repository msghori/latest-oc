import React, { useEffect, useRef } from "react";
import { OrgChart as D3OrgChart } from "../d3-org-chart.js";

const OrgChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getCardColor = (id) => {
    return "white";
  };

  const handleExpandAll = () => {
    if (chartInstance.current) {
      chartInstance.current.expandAll();
    }
  };

  const handleCollapseAll = () => {
    if (chartInstance.current) {
      chartInstance.current.collapseAll();
    }
  };

  const handleFit = () => {
    if (chartInstance.current) {
      chartInstance.current.fit();
    }
  };

  const handleZoomIn = () => {
    if (chartInstance.current) {
      chartInstance.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (chartInstance.current) {
      chartInstance.current.zoomOut();
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    const isMobile = window.innerWidth < 768;
    const containerHeight = window.innerHeight;

    // Calculate subordinate counts
    const getSubordinateCount = (personId) => {
      let count = 0;
      const countChildren = (id) => {
        data.forEach((emp) => {
          if (emp.parentId === id) {
            count++;
            countChildren(emp.id);
          }
        });
      };
      countChildren(personId);
      return count;
    };

    // Initialize chart
    chartInstance.current = new D3OrgChart()
      .container(chartRef.current)
      .data(data)
      .svgHeight(containerHeight)
      .nodeWidth(() => (isMobile ? 260 : 320))
      .nodeHeight(() => (isMobile ? 170 : 180))
      .compact(false)
      .initialExpandLevel(0)
      .nodeContent((d) => {
        const person = d.data;
        const subordinateCount = getSubordinateCount(person.id);
        const cardWidth = isMobile ? 260 : 320;
        const imgSize = isMobile ? 50 : 90;
        const fontSize = isMobile ? 12 : 14;
        const smallFont = isMobile ? 10 : 11;
        const tinyFont = isMobile ? 10 : 11;
        const basePath = import.meta.env.BASE_URL || "/";
        const profilePath = `${basePath}profile/${person.image.toLowerCase()}`;
        const defaultPath = `${basePath}profile/default.jpg`;
        const flagPath = `${basePath}flags/${person.country.toLowerCase()}.png`;

        return `
          <div style="
            padding: ${isMobile ? "15px" : "0px 8px"};
            background: white;
            border: 3px solid #95b7fa;
            border-radius: 0px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            color: #000;
            height: 100%;
            display: flex;
            align-items: center;
            gap: ${isMobile ? "8px" : "15px"};
            width: ${cardWidth}px;
            position: relative;
          ">
            <img 
              src="${profilePath}" 
              onerror="this.src='${defaultPath}'"
              alt="${person.name}"
              style="
                width: ${imgSize}px;
                height: ${imgSize}px;
                border-radius: 50%;
                border: 3px solid #95b7fa;
                object-fit: cover;
                flex-shrink: 0;
              "
            />
            <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: ${
              isMobile ? "6px" : "2px"
            };">
              <div>
                <div style="font-weight: bold; font-size: ${fontSize}px; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #333;">
                  ${person.name}
                </div>
                <div style="font-size: ${smallFont}px; color: #93959b; margin-bottom: 4px; font-weight:bold;">
                  ${person.position}
                </div>
              </div>
              <div style="
                font-size: ${tinyFont}px;
                line-height: 1.5;
              ">
                <div style="margin-bottom: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color:#93959b;">
                  <strong>Email:</strong> ${person.email}
                </div>
                <div style="margin-bottom: 3px; color: #93959b;">
                  <strong>Phone:</strong> ${person.phone}
                </div>
                <div style="margin-bottom: 3px; color: #93959b;">
                  <strong>Report to:</strong> ${person.reportTo || "N/A"}
                </div>
                ${
                  subordinateCount > 0
                    ? `<div style="margin-bottom: 3px; color: #93959b;">
                  <strong>Subordinates:</strong> ${subordinateCount}
                </div>`
                    : ""
                }
              </div>
            </div>
            <img 
              src="${flagPath}" 
              alt="${person.country}"
              style="
                position: absolute;
                bottom: 8px;
                right: 8px;
                width: 40px;
                height: 40px;
                object-fit: cover;
                border: 1px solid #95b7fa;
                border-radius: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              "
            />
          </div>
        `;
      })
      .render();

    // Handle window resize
    const handleResize = () => {
      if (chartInstance.current) {
        const newHeight = window.innerHeight;
        chartInstance.current.svgHeight(newHeight).render();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance.current) {
        chartInstance.current.clear();
        chartInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Update chart when data changes
    if (chartInstance.current && data) {
      chartInstance.current.data(data).render();
    }
  }, [data]);

  return (
    <>
      {/* Header with Title and Controls */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "rgba(10, 10, 10, 0.95)",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #667eea",
          boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Title */}
        <h1
          style={{
            color: "white",
            fontSize: window.innerWidth < 768 ? "16px" : "20px",
            fontWeight: "bold",
            margin: "0px",
            padding: "5px 0",
          }}
        >
          EpicSemi Organization Chart
        </h1>

        {/* Controls */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap" }}>
          <button
            onClick={handleExpandAll}
            style={buttonStyle}
            title="Expand All"
          >
            <i className="fas fa-expand-arrows-alt"></i>
          </button>
          <button
            onClick={handleCollapseAll}
            style={buttonStyle}
            title="Collapse All"
          >
            <i className="fas fa-compress-arrows-alt"></i>
          </button>
          <button onClick={handleFit} style={buttonStyle} title="Fit to Screen">
            <i className="fas fa-expand"></i>
          </button>
          <button onClick={handleZoomIn} style={buttonStyle} title="Zoom In">
            <i className="fas fa-search-plus"></i>
          </button>
          <button onClick={handleZoomOut} style={buttonStyle} title="Zoom Out">
            <i className="fas fa-search-minus"></i>
          </button>
          <button
            onClick={handleLogout}
            style={{
              ...buttonStyle,
              background: "white",
            }}
            title="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x pan-y",
          position: "relative",
          paddingTop: "100px",
        }}
      />
    </>
  );
};

const buttonStyle = {
  background: "#fff",
  color: "#000",
  border: "none",
  padding: "10px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "500",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  width: "35px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export default OrgChart;
