import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  // ✅ FIX: control scroll properly
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a file first");
      return;
    }

    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        "http://localhost:5001/api/chat/upload",
        formData
      );

      const actualData = res.data.data;

      localStorage.clear();
      localStorage.setItem("chatData", JSON.stringify(actualData));

      navigate("/insights");

    } catch (err) {
      console.error(err);
      alert("Error analyzing chat ❌");
      setAnalyzing(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith(".txt")) {
        setFile(droppedFile);
      } else {
        alert("Upload only .txt file");
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Animated Background Orbs */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgOrb3} />
      
      {/* Floating Particles */}
      <div style={styles.particle1}>💬</div>
      <div style={styles.particle2}>📊</div>
      <div style={styles.particle3}>✨</div>
      <div style={styles.particle4}>🚀</div>

      <div style={styles.card}>
        {/* Animated Icon */}
        <div style={styles.iconWrapper}>
          <div style={styles.icon}>💬</div>
        </div>

        <h1 style={styles.heading}>
          WhatsApp Chat <span style={styles.gradientText}>Analyzer</span>
        </h1>
        <p style={styles.subtext}>
          Upload your chat file and get instant insights
        </p>

        {/* Upload Box with Drag & Drop */}
        <div
          style={{
            ...styles.uploadBox,
            ...(dragActive ? styles.uploadActive : {}),
            ...(file ? styles.uploadHasFile : {}),
          }}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input type="file" onChange={handleFileChange} hidden id="fileInput" accept=".txt" />
          <label htmlFor="fileInput" style={styles.uploadLabel}>
            <div style={styles.uploadIcon}>{file ? "✅" : "📄"}</div>
            <div style={styles.uploadText}>
              {file ? file.name : "Choose a .txt file"}
            </div>
            <div style={styles.uploadHint}>
              {file ? "Click to change" : "or drag & drop here"}
            </div>
          </label>
        </div>

        {/* Analyze Button with Loading State */}
        <button
          style={{
            ...styles.button,
            ...(file && !analyzing ? styles.buttonActive : {}),
            ...(analyzing ? styles.buttonAnalyzing : {}),
          }}
          onClick={handleAnalyze}
          disabled={!file || analyzing}
        >
          {analyzing ? (
            <>
              <span style={styles.spinner} />
              Analyzing Chat...
            </>
          ) : (
            <>
              <span style={styles.buttonIcon}>🚀</span>
              Analyze Chat
            </>
          )}
        </button>

        {/* Features Pills */}
        <div style={styles.features}>
          <div style={styles.pill}>📊 Message Stats</div>
          <div style={styles.pill}>👥 Participant Analysis</div>
          <div style={styles.pill}>📈 Activity Timeline</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  // Animated Background Orbs
  bgOrb1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,198,255,0.15) 0%, rgba(0,123,255,0) 70%)",
    top: "-250px",
    right: "-150px",
    animation: "float1 20s infinite ease-in-out",
    pointerEvents: "none",
  },
  bgOrb2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(156,0,210,0.12) 0%, rgba(156,0,210,0) 70%)",
    bottom: "-150px",
    left: "-100px",
    animation: "float2 15s infinite ease-in-out reverse",
    pointerEvents: "none",
  },
  bgOrb3: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,255,200,0.08) 0%, rgba(0,255,200,0) 70%)",
    bottom: "20%",
    right: "10%",
    animation: "float3 18s infinite ease-in-out",
    pointerEvents: "none",
  },

  // Floating Particles
  particle1: {
    position: "absolute",
    top: "15%",
    left: "10%",
    fontSize: "2rem",
    opacity: 0.2,
    animation: "particleFloat 8s infinite ease-in-out",
    pointerEvents: "none",
  },
  particle2: {
    position: "absolute",
    top: "70%",
    right: "12%",
    fontSize: "2.5rem",
    opacity: 0.15,
    animation: "particleFloat 10s infinite ease-in-out reverse",
    pointerEvents: "none",
  },
  particle3: {
    position: "absolute",
    bottom: "15%",
    left: "15%",
    fontSize: "1.8rem",
    opacity: 0.15,
    animation: "particleFloat 12s infinite ease-in-out",
    pointerEvents: "none",
  },
  particle4: {
    position: "absolute",
    top: "40%",
    right: "20%",
    fontSize: "2rem",
    opacity: 0.15,
    animation: "particleFloat 9s infinite ease-in-out reverse",
    pointerEvents: "none",
  },

  card: {
    background: "rgba(25, 25, 45, 0.85)",
    backdropFilter: "blur(20px)",
    padding: "50px 45px",
    borderRadius: "32px",
    width: "480px",
    maxWidth: "90%",
    textAlign: "center",
    boxShadow: "0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
    zIndex: 2,
    animation: "fadeInUp 0.6s ease-out",
  },

  iconWrapper: {
    marginBottom: "20px",
  },
  icon: {
    fontSize: "55px",
    display: "inline-block",
    filter: "drop-shadow(0 0 15px rgba(0,198,255,0.6))",
    animation: "bounce 2s infinite",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "12px",
    letterSpacing: "-0.02em",
    color: "#fff",
  },
  gradientText: {
    background: "linear-gradient(135deg, #00c6ff 0%, #007bff 50%, #7209b7 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "shimmer 3s linear infinite",
  },

  subtext: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    marginBottom: "35px",
    lineHeight: "1.5",
  },

  uploadBox: {
    border: "2px dashed rgba(255,255,255,0.2)",
    borderRadius: "20px",
    padding: "35px 20px",
    cursor: "pointer",
    marginBottom: "25px",
    transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)",
    background: "rgba(255,255,255,0.03)",
  },
  uploadActive: {
    borderColor: "#00c6ff",
    background: "rgba(0,198,255,0.1)",
    transform: "scale(1.02)",
  },
  uploadHasFile: {
    borderColor: "#00c6ff",
    background: "rgba(0,198,255,0.05)",
  },
  uploadLabel: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  uploadIcon: {
    fontSize: "40px",
    transition: "transform 0.3s ease",
  },
  uploadText: {
    margin: "10px 0 5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "500",
    wordBreak: "break-all",
    maxWidth: "100%",
  },
  uploadHint: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "12px",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "40px",
    border: "none",
    background: "#555",
    color: "#fff",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "not-allowed",
    marginBottom: "30px",
    transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.4, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    opacity: 0.6,
  },
  buttonActive: {
    background: "linear-gradient(135deg, #00c6ff, #007bff, #7209b7)",
    backgroundSize: "200% auto",
    cursor: "pointer",
    opacity: 1,
    boxShadow: "0 5px 20px rgba(0,198,255,0.4)",
    animation: "gradientShift 2s ease infinite",
  },
  buttonAnalyzing: {
    background: "linear-gradient(135deg, #f093fb, #f5576c)",
    cursor: "wait",
    opacity: 0.9,
  },
  buttonIcon: {
    fontSize: "18px",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  pill: {
    background: "rgba(255,255,255,0.08)",
    padding: "8px 16px",
    borderRadius: "40px",
    fontSize: "12px",
    color: "rgba(255,255,255,0.8)",
    transition: "all 0.3s ease",
    cursor: "default",
  },
};

// Add CSS animations
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes float1 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(30px, -30px) rotate(5deg); }
      66% { transform: translate(-20px, 20px) rotate(-3deg); }
    }
    @keyframes float2 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(-25px, -25px) rotate(-4deg); }
      66% { transform: translate(20px, 15px) rotate(3deg); }
    }
    @keyframes float3 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(15px, -15px) scale(1.05); }
    }
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-30px) rotate(15deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes shimmer {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Home;