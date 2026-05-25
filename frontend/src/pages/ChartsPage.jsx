import Charts from "../components/Charts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartsPage() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const data = JSON.parse(localStorage.getItem("chatData"));

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!data) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.bgOrb1} />
        <div style={styles.bgOrb2} />
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>📊</div>
          <h2 style={styles.errorTitle}>No Data Found</h2>
          <p style={styles.errorText}>Please upload a chat file first</p>
          <button style={styles.errorBtn} onClick={() => navigate("/")}>
            ⬅ Go Back to Upload
          </button>
        </div>
      </div>
    );
  }

  // Chart options
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#00c6ff',
        bodyColor: '#fff'
      }
    },
    scales: {
      y: {
        ticks: { color: '#aaa' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: {
        ticks: { color: '#aaa', rotation: 45 },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background Orbs */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgOrb3} />
      <div style={styles.bgOrb4} />
      <div style={styles.gridPattern} />

      {/* Floating Particles */}
      <div style={styles.particle1}>📊</div>
      <div style={styles.particle2}>📈</div>
      <div style={styles.particle3}>💬</div>
      <div style={styles.particle4}>🎯</div>

      {/* Back Button */}
      <button
        style={styles.backBtn}
        onClick={() => navigate("/insights")}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateX(-5px)";
          e.currentTarget.style.background = "rgba(0,198,255,0.2)";
          e.currentTarget.style.borderColor = "#00c6ff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(0)";
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }}
      >
        <span style={styles.backIcon}>←</span>
        Back to Insights
      </button>

      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerBadge}>
            <span style={styles.headerBadgeIcon}>📊</span>
            <span>Data Visualization</span>
          </div>
          <h1 style={styles.headerTitle}>
            Messages <span style={styles.headerGradient}>Analytics</span>
          </h1>
          <p style={styles.headerSubtitle}>
            Visual breakdown of message patterns and user activity
          </p>
        </div>

        {/* Main Chart */}
        <div style={styles.chartCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>📈</span>
            <h3 style={styles.cardTitle}>Messages Per User</h3>
          </div>
          <Charts data={data} />
        </div>

        {/* Activity Map Section */}
        <div style={styles.chartCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>🗓️</span>
            <h3 style={styles.cardTitle}>Activity Map</h3>
          </div>

          <div style={styles.row}>
            {/* Most Busy Day */}
            <div style={styles.halfChart}>
              <div style={styles.chartHeader}>
                <span style={styles.chartIcon}>📅</span>
                <h4 style={styles.chartSubTitle}>Most Busy Day</h4>
              </div>
              <div style={{ height: "280px" }}>
                <Bar
                  data={{
                    labels: Object.keys(data.dayCount || {}),
                    datasets: [
                      {
                        label: "Messages",
                        data: Object.values(data.dayCount || {}),
                        backgroundColor: "rgba(123, 44, 191, 0.8)",
                        borderRadius: 8,
                        hoverBackgroundColor: "rgba(123, 44, 191, 1)",
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* Most Busy Month */}
            <div style={styles.halfChart}>
              <div style={styles.chartHeader}>
                <span style={styles.chartIcon}>📆</span>
                <h4 style={styles.chartSubTitle}>Most Busy Month</h4>
              </div>
              <div style={{ height: "280px" }}>
                <Bar
                  data={{
                    labels: Object.keys(data.monthCount || {}),
                    datasets: [
                      {
                        label: "Messages",
                        data: Object.values(data.monthCount || {}),
                        backgroundColor: "rgba(255, 136, 0, 0.8)",
                        borderRadius: 8,
                        hoverBackgroundColor: "rgba(255, 136, 0, 1)",
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>

          {/* Emoji Button */}
          <div style={styles.emojiWrapper}>
            <button
              style={styles.emojiBtn}
              onClick={() => navigate("/emoji")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,198,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,198,255,0.3)";
              }}
            >
              <span style={styles.emojiIcon}>😊</span>
              View Emoji Analysis
              <span style={styles.emojiArrow}>→</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>© 2024 WhatsApp Chat Analyzer | Visualize your conversation patterns</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          style={styles.scrollTopBtn}
          onClick={scrollToTop}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #24243e 100%)",
    position: "relative",
    overflowX: "hidden",
  },

  content: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px 40px 60px",
    position: "relative",
    zIndex: 2,
  },

  // Animated Background Orbs
  bgOrb1: {
    position: "fixed",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,198,255,0.12) 0%, rgba(0,123,255,0) 70%)",
    top: "-300px",
    right: "-200px",
    animation: "float1 20s infinite ease-in-out",
    pointerEvents: "none",
  },
  bgOrb2: {
    position: "fixed",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(156,0,210,0.1) 0%, rgba(156,0,210,0) 70%)",
    bottom: "-250px",
    left: "-150px",
    animation: "float2 18s infinite ease-in-out reverse",
    pointerEvents: "none",
  },
  bgOrb3: {
    position: "fixed",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,255,200,0.08) 0%, rgba(0,255,200,0) 70%)",
    bottom: "10%",
    right: "5%",
    animation: "float3 22s infinite ease-in-out",
    pointerEvents: "none",
  },
  bgOrb4: {
    position: "fixed",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,100,100,0.06) 0%, rgba(255,100,100,0) 70%)",
    top: "40%",
    left: "-100px",
    animation: "float1 25s infinite ease-in-out",
    pointerEvents: "none",
  },

  gridPattern: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },

  // Floating Particles
  particle1: {
    position: "fixed",
    top: "15%",
    left: "5%",
    fontSize: "2rem",
    opacity: 0.15,
    animation: "particleFloat 12s infinite ease-in-out",
    pointerEvents: "none",
  },
  particle2: {
    position: "fixed",
    top: "70%",
    right: "8%",
    fontSize: "2.5rem",
    opacity: 0.12,
    animation: "particleFloat 15s infinite ease-in-out reverse",
    pointerEvents: "none",
  },
  particle3: {
    position: "fixed",
    bottom: "15%",
    left: "10%",
    fontSize: "1.8rem",
    opacity: 0.1,
    animation: "particleFloat 18s infinite ease-in-out",
    pointerEvents: "none",
  },
  particle4: {
    position: "fixed",
    top: "40%",
    right: "15%",
    fontSize: "2rem",
    opacity: 0.1,
    animation: "particleFloat 14s infinite ease-in-out reverse",
    pointerEvents: "none",
  },

  // Back Button
  backBtn: {
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 100,
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "40px",
    padding: "10px 20px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },
  backIcon: {
    fontSize: "16px",
  },

  // Header
  header: {
    textAlign: "center",
    marginBottom: "50px",
    marginTop: "20px",
  },
  headerBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(0,198,255,0.15)",
    backdropFilter: "blur(10px)",
    padding: "8px 18px",
    borderRadius: "50px",
    fontSize: "0.85rem",
    color: "#00c6ff",
    marginBottom: "20px",
    border: "1px solid rgba(0,198,255,0.3)",
  },
  headerBadgeIcon: {
    fontSize: "1rem",
  },
  headerTitle: {
    fontSize: "3rem",
    fontWeight: "800",
    marginBottom: "15px",
    letterSpacing: "-0.02em",
    color: "#fff",
  },
  headerGradient: {
    background: "linear-gradient(135deg, #00c6ff, #007bff, #7209b7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "1.1rem",
    marginBottom: "30px",
  },

  // Chart Cards
  chartCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(15px)",
    borderRadius: "24px",
    padding: "30px",
    marginBottom: "30px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      background: "rgba(255, 255, 255, 0.08)",
    },
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "25px",
    paddingBottom: "15px",
    borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
  },
  cardIcon: {
    fontSize: "1.8rem",
  },
  cardTitle: {
    color: "#fff",
    fontSize: "1.3rem",
    fontWeight: "600",
    margin: 0,
  },

  row: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  halfChart: {
    flex: "1",
    minWidth: "320px",
    background: "rgba(0, 0, 0, 0.3)",
    padding: "20px",
    borderRadius: "20px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      background: "rgba(0, 0, 0, 0.4)",
    },
  },

  chartHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  chartIcon: {
    fontSize: "1.5rem",
  },
  chartSubTitle: {
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "500",
    margin: 0,
  },

  // Emoji Button
  emojiWrapper: {
    textAlign: "center",
    marginTop: "20px",
  },
  emojiBtn: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #00c6ff, #007bff)",
    border: "none",
    borderRadius: "50px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)",
    boxShadow: "0 5px 20px rgba(0,198,255,0.3)",
  },
  emojiIcon: {
    fontSize: "20px",
  },
  emojiArrow: {
    fontSize: "18px",
    transition: "transform 0.3s ease",
  },

  // Footer
  footer: {
    textAlign: "center",
    marginTop: "50px",
    paddingTop: "30px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: "0.85rem",
  },

  // Scroll to Top Button
  scrollTopBtn: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00c6ff, #007bff)",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 20px rgba(0,198,255,0.4)",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Error State
  errorContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #24243e 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  errorCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    borderRadius: "40px",
    padding: "60px 70px",
    textAlign: "center",
    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
    zIndex: 2,
    animation: "fadeInUp 0.6s ease-out",
  },
  errorIcon: {
    fontSize: "4rem",
    marginBottom: "20px",
  },
  errorTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#fff",
  },
  errorText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "1rem",
    marginBottom: "30px",
  },
  errorBtn: {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #00c6ff, #007bff)",
    border: "none",
    borderRadius: "40px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};

// Add CSS animations
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes float1 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(50px, -50px) rotate(5deg); }
      66% { transform: translate(-30px, 30px) rotate(-3deg); }
    }
    @keyframes float2 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(-40px, -35px) rotate(-4deg); }
      66% { transform: translate(35px, 25px) rotate(3deg); }
    }
    @keyframes float3 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(30px, -30px) scale(1.08); }
    }
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-40px) rotate(15deg); }
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default ChartsPage;