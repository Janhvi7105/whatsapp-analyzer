import { useState } from "react";
import API from "../services/api";

function Upload({ setData, setLoading }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 🔹 Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // 🔹 Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      if (droppedFile.name.endsWith(".txt")) {
        setFile(droppedFile);
      } else {
        alert("Please upload a .txt file 📁");
      }
    }
  };

  // 🔹 Upload logic
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a chat file first 📁");
      return;
    }

    setLoading(true);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/chat/upload", formData);

      // ✅ Send full response to Home
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background Effects */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgOrb3} />

      <div style={styles.box}>
        <div style={styles.iconWrapper}>
          <span style={styles.icon}>💬</span>
        </div>

        <h1 style={styles.title}>WhatsApp Chat Analyzer</h1>
        <p style={styles.subtitle}>
          Upload your exported chat file to get insights
        </p>

        {/* Upload Area */}
        <div
          style={{
            ...styles.uploadSection,
            ...(dragActive ? styles.uploadSectionDrag : {}),
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            id="file-upload"
            type="file"
            accept=".txt"
            style={styles.fileInput}
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile && selectedFile.name.endsWith(".txt")) {
                setFile(selectedFile);
              } else {
                alert("Only .txt files allowed 📁");
              }
            }}
          />

          <label htmlFor="file-upload" style={styles.fileLabel}>
            <div style={styles.uploadIcon}>📄</div>

            <div style={styles.uploadText}>
              {file ? file.name : "Choose a .txt File"}
            </div>

            <div style={styles.uploadHint}>
              {file ? "Click to change" : "or drag & drop"}
            </div>
          </label>
        </div>

        {/* Button */}
        <button
          style={{
            ...styles.button,
            opacity: uploading ? 0.6 : 1,
            cursor: uploading ? "not-allowed" : "pointer",
          }}
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Analyzing..." : "🚀 Analyze Chat"}
        </button>

        {/* Features */}
        <div style={styles.features}>
          <span style={styles.feature}>📊 Message Stats</span>
          <span style={styles.feature}>👥 Participant Analysis</span>
          <span style={styles.feature}>📈 Activity Timeline</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  bgOrb1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,198,255,0.15) 0%, transparent 70%)",
    top: "-250px",
    right: "-150px",
  },
  bgOrb2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(156,0,210,0.12) 0%, transparent 70%)",
    bottom: "-150px",
    left: "-100px",
  },
  bgOrb3: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,255,200,0.08) 0%, transparent 70%)",
    bottom: "20%",
    right: "10%",
  },
  box: {
    background: "rgba(20, 20, 40, 0.65)",
    backdropFilter: "blur(20px)",
    borderRadius: "40px",
    padding: "48px",
    textAlign: "center",
    width: "90%",
    maxWidth: "540px",
  },
  iconWrapper: { marginBottom: "20px" },
  icon: { fontSize: "4rem" },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "12px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "40px",
  },
  uploadSection: { marginBottom: "32px" },
  uploadSectionDrag: { transform: "scale(1.02)" },
  fileInput: { display: "none" },
  fileLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.05)",
    border: "2px dashed rgba(255,255,255,0.2)",
    borderRadius: "24px",
    padding: "32px",
    cursor: "pointer",
  },
  uploadIcon: { fontSize: "3rem" },
  uploadText: { fontSize: "1.1rem" },
  uploadHint: { fontSize: "0.8rem", opacity: 0.6 },
  button: {
    background: "linear-gradient(135deg, #00c6ff, #007bff)",
    border: "none",
    color: "#fff",
    padding: "14px 32px",
    borderRadius: "50px",
    width: "100%",
    marginTop: "10px",
  },
  features: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginTop: "32px",
    flexWrap: "wrap",
  },
  feature: {
    fontSize: "0.75rem",
    padding: "6px 12px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "50px",
  },
};

export default Upload;