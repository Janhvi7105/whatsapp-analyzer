import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { useEffect, useState } from "react";

function Insights() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 🔥 SAFE LOAD
  let data = null;

  try {
    const stored = localStorage.getItem("chatData");
    data = stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("❌ Error parsing localStorage:", err);
  }

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

  // 🔍 DEBUG
  console.log("📊 INSIGHTS DATA:", data);

  // ❌ If no data OR empty object
  if (!data || Object.keys(data).length === 0) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.bgOrb1} />
        <div style={styles.bgOrb2} />
        <div style={styles.bgOrb3} />
        <div style={styles.bgOrb4} />
        
        <div style={styles.errorCard}>
          <div style={styles.errorIconWrapper}>
            <div style={styles.errorIcon}>😕</div>
            <div style={styles.errorIconRing} />
          </div>
          <h2 style={styles.errorTitle}>No Data Found</h2>
          <p style={styles.errorText}>Please upload a chat file first to see insights</p>
          <button 
            style={styles.errorBtn} 
            onClick={() => navigate("/")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,198,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,198,255,0.3)";
            }}
          >
            <span>⬅</span> Go Back to Upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Animated Background Elements */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgOrb3} />
      <div style={styles.bgOrb4} />
      <div style={styles.gridPattern} />
      
      {/* Floating Particles */}
      <div style={styles.particle1}>✨</div>
      <div style={styles.particle2}>💬</div>
      <div style={styles.particle3}>📊</div>
      <div style={styles.particle4}>🎯</div>
      
      {/* Back to Home Button - Top Left */}
      <button 
        style={styles.homeButton}
        onClick={() => navigate("/")}
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
        <span style={styles.homeIcon}>🏠</span>
        Back to Home
      </button>
      
      <div style={styles.content}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerBadge}>
            <span style={styles.headerBadgeIcon}>🎉</span>
            <span>Insights Ready</span>
          </div>
          <h1 style={styles.headerTitle}>
            Chat Analytics <span style={styles.headerGradient}>Dashboard</span>
          </h1>
          <p style={styles.headerSubtitle}>
            Deep dive into your conversation patterns and engagement metrics
          </p>
          
          {/* Quick Stats Bar */}
          <div style={styles.quickStats}>
            <div style={styles.quickStat}>
              <span style={styles.quickStatIcon}>⏱️</span>
              <span>Real-time Analysis</span>
            </div>
            <div style={styles.quickStat}>
              <span style={styles.quickStatIcon}>🔒</span>
              <span>Privacy Protected</span>
            </div>
            <div style={styles.quickStat}>
              <span style={styles.quickStatIcon}>⚡</span>
              <span>Instant Results</span>
            </div>
          </div>
        </div>

        {/* 🔹 Dashboard */}
        <Dashboard data={data} />

        {/* 🔹 Action Buttons */}
        <div style={styles.buttonContainer}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/charts")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,198,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,198,255,0.3)";
            }}
          >
            <span style={styles.btnIcon}>📊</span>
            View Messages Per User
            <span style={styles.btnArrow}>→</span>
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => {
              localStorage.removeItem("chatData");
              navigate("/");
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.background = "rgba(255, 100, 100, 0.15)";
              e.currentTarget.style.borderColor = "#ff6464";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <span style={styles.btnIcon}>🔄</span>
            Upload Another Chat
          </button>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>© 2024 WhatsApp Chat Analyzer | Transform your conversations into insights</p>
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

// 🎨 Premium Styles
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #24243e 100%)",
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto",
  },
  
  content: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px 40px 60px",
    position: "relative",
    zIndex: 2,
  },
  
  homeButton: {
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
  
  homeIcon: {
    fontSize: "16px",
  },
  
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
  
  quickStats: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  
  quickStat: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    padding: "8px 18px",
    borderRadius: "50px",
    fontSize: "0.85rem",
    color: "rgba(255, 255, 255, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  
  quickStatIcon: {
    fontSize: "1rem",
  },
  
  buttonContainer: {
    textAlign: "center",
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    padding: "20px 0",
  },
  
  primaryBtn: {
    padding: "15px 35px",
    background: "linear-gradient(135deg, #00c6ff, #007bff)",
    border: "none",
    borderRadius: "50px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)",
    boxShadow: "0 5px 20px rgba(0,198,255,0.3)",
  },
  
  secondaryBtn: {
    padding: "15px 35px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "50px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)",
  },
  
  btnIcon: {
    fontSize: "18px",
  },
  
  btnArrow: {
    fontSize: "18px",
    transition: "transform 0.3s ease",
  },
  
  footer: {
    textAlign: "center",
    marginTop: "60px",
    paddingTop: "30px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: "0.85rem",
  },
  
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
    boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
    zIndex: 2,
    animation: "fadeInUp 0.6s ease-out",
    maxWidth: "500px",
    width: "90%",
  },
  
  errorIconWrapper: {
    position: "relative",
    display: "inline-block",
    marginBottom: "25px",
  },
  
  errorIcon: {
    fontSize: "5rem",
    position: "relative",
    zIndex: 2,
  },
  
  errorIconRing: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "2px solid rgba(0,198,255,0.3)",
    transform: "translate(-50%, -50%)",
    animation: "pulse 2s infinite",
  },
  
  errorTitle: {
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "15px",
    background: "linear-gradient(135deg, #fff, #00c6ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  
  errorText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "1rem",
    marginBottom: "35px",
  },
  
  errorBtn: {
    padding: "14px 32px",
    background: "linear-gradient(135deg, #00c6ff, #007bff)",
    border: "none",
    borderRadius: "50px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
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
    @keyframes pulse {
      0%, 100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.6;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.3);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Insights;