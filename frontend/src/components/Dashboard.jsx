import React from "react";

function Dashboard({ data }) {
  // ✅ Prevent crash
  if (!data) {
    return (
      <div style={styles.container}>
        <h2>No data available</h2>
      </div>
    );
  }

  // 🔹 Top words (safe)
  const topWords = data.wordCount
    ? Object.entries(data.wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    : [];

  // 🔹 Avg messages (FIX NaN)
  const totalParticipants = Object.keys(data.userCount || {}).length || 1;

  const avgMessagesPerPerson = data.totalMessages
    ? (data.totalMessages / totalParticipants).toFixed(1)
    : 0;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Chat Insights</h1>

      {/* 🔹 METRICS */}
      <div style={styles.metricsRow}>
        <MetricCard
          icon="💬"
          label="Total Messages"
          value={data.totalMessages || 0}
        />

        <MetricCard
          icon="👑"
          label="Most Active User"
          value={data.mostActiveUser || "N/A"}
        />

        <MetricCard
          icon="📊"
          label="Avg Messages/Person"
          value={avgMessagesPerPerson}
        />
      </div>

      {/* 🔹 GRID */}
      <div style={styles.grid}>
        {/* 🧠 SUMMARY */}
        <div style={styles.card}>
          <h3>🧠 Summary</h3>
          <p>{data.summary || "No summary available"}</p>
        </div>

        {/* 📈 SENTIMENT */}
        <div style={styles.card}>
          <h3>📈 Sentiment Analysis</h3>

          {data?.sentiment?.label ? (
            <>
              <h2 style={styles.highlight}>
                {data.sentiment.label}
              </h2>

              <div style={styles.barBg}>
                <div
                  style={{
                    ...styles.barFill,
                    width: `${(data.sentiment.score || 0) * 100}%`,
                  }}
                />
              </div>

              <p style={styles.center}>
                Confidence:{" "}
                {((data.sentiment.score || 0) * 100).toFixed(1)}%
              </p>
            </>
          ) : (
            <p>No sentiment data</p>
          )}
        </div>

        {/* 😊 EMOTION */}
        <div style={styles.card}>
          <h3>😊 Emotion Detection</h3>

          {data?.emotion?.all?.length > 0 ? (
            data.emotion.all.map((item, index) => (
              <div key={index} style={{ marginBottom: "12px" }}>
                <div style={styles.row}>
                  <span>{item.label}</span>
                  <span>{(item.score * 100).toFixed(1)}%</span>
                </div>

                <div style={styles.barBg}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: `${item.score * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No emotion data</p>
          )}
        </div>

        {/* 🔥 TOP WORDS */}
        <div style={styles.card}>
          <h3>🔥 Top Words</h3>

          {topWords.length > 0 ? (
            topWords.map(([word, count], i) => (
              <p key={i}>
                #{i + 1} {word} ({count})
              </p>
            ))
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>
    </div>
  );
}

// 🔹 Metric Card
const MetricCard = ({ icon, label, value }) => (
  <div style={styles.metricCard}>
    <h2>{icon}</h2>
    <p>{label}</p>
    <h3>{value}</h3>
  </div>
);

// 🎨 Styles
const styles = {
  container: {
    padding: "30px",
    background: "#0f0c29",
    minHeight: "100vh",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  metricsRow: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  metricCard: {
    background: "#1a1a2e",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    minWidth: "150px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#1a1a2e",
    padding: "20px",
    borderRadius: "15px",
  },
  highlight: {
    textAlign: "center",
    color: "#00c6ff",
  },
  barBg: {
    height: "8px",
    background: "#333",
    borderRadius: "10px",
    marginTop: "8px",
  },
  barFill: {
    height: "100%",
    background: "#00c6ff",
    borderRadius: "10px",
  },
  center: {
    textAlign: "center",
    marginTop: "10px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default Dashboard;