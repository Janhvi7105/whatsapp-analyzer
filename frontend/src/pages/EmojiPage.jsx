import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmojiPage() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const data = JSON.parse(localStorage.getItem("chatData"));

  const emojiData = data?.emojiCount || {};

  // 🔥 SORT TOP EMOJIS
  const sorted = Object.entries(emojiData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const labels = sorted.map(e => e[0]);
  const values = sorted.map(e => e[1]);

  // Scroll to top button visibility
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

  // Generate floating emojis for background
  const floatingEmojis = ["😊", "😂", "❤️", "🔥", "👍", "🎉", "😍", "🥳", "😎", "💯", "✨", "⭐", "💕", "😭", "🤣", "🙌", "😘", "💪", "👏", "🎊"];

  return (
    <div style={styles.container}>
      {/* Animated Background Orbs */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgOrb3} />
      <div style={styles.bgOrb4} />
      <div style={styles.gridPattern} />

      {/* Continuously Moving Floating Emojis */}
      {floatingEmojis.map((emoji, index) => (
        <div
          key={index}
          style={{
            ...styles.floatingEmoji,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${10 + Math.random() * 15}s`,
            fontSize: `${1.5 + Math.random() * 2}rem`,
            opacity: 0.1 + Math.random() * 0.15,
          }}
        >
          {emoji}
        </div>
      ))}

      {/* Additional Random Emojis */}
      {[...Array(30)].map((_, index) => (
        <div
          key={`emoji-${index}`}
          style={{
            ...styles.floatingEmoji2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${8 + Math.random() * 12}s`,
            fontSize: `${1 + Math.random() * 1.5}rem`,
            opacity: 0.08 + Math.random() * 0.12,
          }}
        >
          {floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)]}
        </div>
      ))}

      {/* Back Button */}
      <button
        style={styles.backBtn}
        onClick={() => navigate("/charts")}
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
        Back to Charts
      </button>

      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerBadge}>
            <span style={styles.headerBadgeIcon}>😊</span>
            <span>Emoji Analytics</span>
          </div>
          <h1 style={styles.headerTitle}>
            Emoji <span style={styles.headerGradient}>Analysis</span>
          </h1>
          <p style={styles.headerSubtitle}>
            Discover the emotions and expressions in your conversations
          </p>
        </div>

        {/* Stats Summary */}
        <div style={styles.statsCard}>
          <div style={styles.statItem}>
            <span style={styles.statIcon}>😊</span>
            <div>
              <p style={styles.statLabel}>Total Unique Emojis</p>
              <h3 style={styles.statValue}>{Object.keys(emojiData).length}</h3>
            </div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statIcon}>📊</span>
            <div>
              <p style={styles.statLabel}>Total Emoji Uses</p>
              <h3 style={styles.statValue}>{Object.values(emojiData).reduce((a, b) => a + b, 0)}</h3>
            </div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statItem}>
            <span style={styles.statIcon}>🏆</span>
            <div>
              <p style={styles.statLabel}>Top Emoji</p>
              <h3 style={styles.statValue}>{sorted[0]?.[0] || "None"}</h3>
            </div>
          </div>
        </div>

        <div style={styles.twoColumnGrid}>
          {/* Top Emojis Table */}
          <div style={styles.tableCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardIcon}>🏆</span>
              <h3 style={styles.cardTitle}>Top Emojis</h3>
            </div>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Emoji</th>
                    <th style={styles.th}>Count</th>
                    <th style={styles.th}>Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(([emoji, count], index) => {
                    const total = Object.values(emojiData).reduce((a, b) => a + b, 0);
                    const percentage = ((count / total) * 100).toFixed(1);
                    return (
                      <tr key={index} style={styles.tr}>
                        <td style={styles.td}>
                          <div style={styles.rankBadge}>#{index + 1}</div>
                        </td>
                        <td style={{ ...styles.td, fontSize: "28px" }}>{emoji}</td>
                        <td style={styles.td}>
                          <span style={styles.countBadge}>{count}</span>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.percentageBar}>
                            <div style={{ ...styles.percentageFill, width: `${percentage}%` }} />
                            <span style={styles.percentageText}>{percentage}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pie Chart */}
          <div style={styles.chartCard}>
            <div style={styles.cardHeader}>
              <span style={styles.cardIcon}>📊</span>
              <h3 style={styles.cardTitle}>Emoji Distribution</h3>
            </div>
            <div style={styles.chartContainer}>
              <Pie
                data={{
                  labels,
                  datasets: [
                    {
                      data: values,
                      backgroundColor: [
                        "#FF6B6B",
                        "#4ECDC4",
                        "#45B7D1",
                        "#96CEB4",
                        "#FFEAA7",
                        "#DDA0DD",
                        "#98D8C8",
                        "#F7B731",
                        "#5D9BEC",
                        "#ED6A5E",
                      ],
                      borderWidth: 0,
                      hoverOffset: 15,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        color: "#fff",
                        font: { size: 11 },
                        boxWidth: 12,
                      },
                    },
                    tooltip: {
                      backgroundColor: "rgba(0,0,0,0.8)",
                      titleColor: "#00c6ff",
                      bodyColor: "#fff",
                      callbacks: {
                        label: (context) => {
                          const label = context.label || "";
                          const value = context.raw || 0;
                          const total = values.reduce((a, b) => a + b, 0);
                          const percentage = ((value / total) * 100).toFixed(1);
                          return `${label}: ${value} (${percentage}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Fun Fact Section */}
        {sorted[0] && (
          <div style={styles.funFactCard}>
            <div style={styles.funFactIcon}>🎉</div>
            <div style={styles.funFactContent}>
              <h4>Fun Fact</h4>
              <p>
                The emoji <strong>{sorted[0][0]}</strong> is used most frequently! 
                It appears <strong>{sorted[0][1]}</strong> times in your conversations.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <p>© 2024 WhatsApp Chat Analyzer | Decode the emotions behind every message</p>
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
    background: "radial-gradient(circle, rgba(255,107,107,0.12) 0%, rgba(255,107,107,0) 70%)",
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
    background: "radial-gradient(circle, rgba(78,205,196,0.1) 0%, rgba(78,205,196,0) 70%)",
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
    background: "radial-gradient(circle, rgba(255,234,167,0.08) 0%, rgba(255,234,167,0) 70%)",
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
    background: "radial-gradient(circle, rgba(157,78,221,0.06) 0%, rgba(157,78,221,0) 70%)",
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

  // Continuously Moving Floating Emojis
  floatingEmoji: {
    position: "fixed",
    bottom: "-50px",
    animation: "floatUp 15s infinite ease-in-out",
    pointerEvents: "none",
    zIndex: 1,
  },
  floatingEmoji2: {
    position: "fixed",
    animation: "floatAround 20s infinite ease-in-out",
    pointerEvents: "none",
    zIndex: 1,
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
    marginBottom: "40px",
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
    background: "linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "1.1rem",
    marginBottom: "30px",
  },

  // Stats Card
  statsCard: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(15px)",
    borderRadius: "24px",
    padding: "25px",
    marginBottom: "30px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    flexWrap: "wrap",
    gap: "20px",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  statIcon: {
    fontSize: "2rem",
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "0.8rem",
    marginBottom: "5px",
  },
  statValue: {
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: 0,
  },
  statDivider: {
    width: "1px",
    height: "40px",
    background: "rgba(255, 255, 255, 0.2)",
  },

  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
    gap: "25px",
    marginBottom: "30px",
  },

  // Table Card
  tableCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(15px)",
    borderRadius: "24px",
    padding: "25px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      background: "rgba(255, 255, 255, 0.08)",
    },
  },

  // Chart Card
  chartCard: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(15px)",
    borderRadius: "24px",
    padding: "25px",
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
    marginBottom: "20px",
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

  chartContainer: {
    height: "350px",
    position: "relative",
  },

  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "0.85rem",
    fontWeight: "600",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  td: {
    padding: "12px",
    color: "#fff",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  tr: {
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.05)",
    },
  },
  rankBadge: {
    background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  countBadge: {
    background: "rgba(0,198,255,0.2)",
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  percentageBar: {
    position: "relative",
    width: "100px",
    height: "24px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    overflow: "hidden",
  },
  percentageFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    background: "linear-gradient(90deg, #00c6ff, #007bff)",
    borderRadius: "20px",
    transition: "width 0.5s ease",
  },
  percentageText: {
    position: "relative",
    zIndex: 2,
    fontSize: "0.7rem",
    padding: "0 8px",
    lineHeight: "24px",
    color: "#fff",
  },

  // Fun Fact Card
  funFactCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    background: "rgba(255, 107, 107, 0.1)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    padding: "20px 30px",
    marginBottom: "30px",
    border: "1px solid rgba(255, 107, 107, 0.3)",
  },
  funFactIcon: {
    fontSize: "3rem",
  },
  funFactContent: {
    flex: 1,
    "& h4": {
      color: "#FF6B6B",
      marginBottom: "5px",
      fontSize: "1rem",
    },
    "& p": {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "0.95rem",
      margin: 0,
    },
    "& strong": {
      color: "#FF6B6B",
    },
  },

  // Footer
  footer: {
    textAlign: "center",
    marginTop: "40px",
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
    background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 20px rgba(255,107,107,0.4)",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
    @keyframes floatAround {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(30px, -50px) rotate(90deg);
      }
      50% {
        transform: translate(-20px, -100px) rotate(180deg);
      }
      75% {
        transform: translate(40px, -70px) rotate(270deg);
      }
      100% {
        transform: translate(0, 0) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default EmojiPage;