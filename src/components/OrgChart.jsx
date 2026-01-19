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
      sessionStorage.removeItem("isLoggedIn");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const isMobile = window.innerWidth < 768;
    const containerHeight = window.innerHeight;

    // Initialize chart
    chartInstance.current = new D3OrgChart()
      .container(chartRef.current)
      .data(data)
      .svgHeight(containerHeight)
      .initialZoom(0.8)
      .nodeWidth(() => (isMobile ? 290 : 320))
      .nodeHeight(() => (isMobile ? 190 : 220))
      .compact(false)
      .nodeContent((d) => {
        const person = d.data;
        const cardWidth = isMobile ? 320 : 320;
        const imgSize = isMobile ? 50 : 60;
        const fontSize = isMobile ? 14 : 16;
        const smallFont = isMobile ? 11 : 12;
        const tinyFont = isMobile ? 10 : 12;

        const basePath = import.meta.env.BASE_URL;
        const profileImg = person.image
          ? `${basePath}profile/${person.image}`
          : `${basePath}profile/default.jpg`;
        const flagImg = person.country
          ? `${basePath}flags/${person.country
              .toLowerCase()
              .replace(/\s+/g, "")}.png`
          : `${basePath}flags/default.png`;

        const subordinatesCount = d.children ? d.children.length : 0;

        const totalCount = person._totalSubordinates || 0;
        const showSubordinates = totalCount > 0;

        return `
          <div style="
            padding: ${isMobile ? "0px" : "0px"};
            background: ${getCardColor(person.id)};
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            color: white;
            height: 100%;
            gap: ${isMobile ? "8px" : "10px"};
            width: ${cardWidth}px;
            box-sizing: border-box;
            overflow: hidden;
            border:4px solid #95b7fa;
          ">

            <div style="
              background:#fff;
              color:#000
              padding: ${isMobile ? "8px" : "10px"};
              border-radius: 8px;
              font-size: ${tinyFont}px;
              line-height: 1.6;overflow: hidden;
            ">
<table style="color: #000; width:100%"><
    <tbody>
    <tr>
            <td rowspan="7">
            <img 
                  src="${profileImg}" 
                  alt="${person.name}"
                  style="
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    border: 2px solid #99b8f8;
                    object-fit: cover;
                    display: block;
                  "
                />
               
                </td>
            <td> <div style="
                  font-weight: bold;
                  font-size: ${fontSize}px;
                  margin-bottom: 4px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  color: #000;
                ">
                  ${person.name}
                </div></td>
    </tr>
    <tr>
            
            <td>

                  ${person.position}
               </td>
    </tr>
    <tr>
           
            <td><div style="margin-bottom: 5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <strong>📧</strong> ${person.email}
              </div></td>
    </tr>
    <tr>
          
            <td> <div style="margin-bottom: 5px;">
                <strong>📞</strong> ${person.phone}
              </div></td>
    </tr>
    <tr>
           
            <td> <div>
                <strong>👤</strong> ${person.reportTo || ""}
              </div></td>
    </tr>
    <tr>
           
            <td> <div>
                 ${
                   showSubordinates
                     ? `<strong>👥 Team:</strong> ${totalCount}`
                     : "&nbsp;"
                 }
              </div></td>
    </tr>
  
    <tr><td style="text-align:right"> <img 
                  src="${flagImg}" 
                  alt="${person.country}"
                  style="
                    width: ${isMobile ? 30 : 40}px;
                    height: ${isMobile ? 30 : 40}px;
                    border-radius: 50%;
                    border: 1px solid #99b8f8;
                    object-fit: cover;
                    display: inline-block;
                  "
                /></td></tr>
    </tbody>
</table>
 
 
             
             
            </div>
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
          padding: "10px 15px",
          display: "inline-block",
          flexDirection: "row",
          gap: "10px",
          borderBottom: "2px solid #667eea",
          boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            margin: 0,
            textAlign: "left",
            display: "inline-block",
          }}
        >
          EpicSemi Org Chart
        </h1>

        {/* Controls */}
        <div
          style={{
            display: "inline-block",
            gap: "8px",
            flexWrap: "wrap",
            textAlign: "right",
            float: "right",
          }}
        >
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
            style={{ ...buttonStyle, background: "#dc3545" }}
            title="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div
        className="canvasDiv"
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          overflow: "hidden",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x pan-y",
          position: "relative",
          paddingTop: "70px",
        }}
      />
    </>
  );
};

const buttonStyle = {
  background: "white",
  color: "black",
  border: "none",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  whiteSpace: "nowrap",
  margin: "0 2px",
};

export default OrgChart;
