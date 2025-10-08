import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={styles.deviceWrapper}>
      <div style={styles.deviceScreen}>
        {/* Fondo superior con ondas */}
        <div style={styles.waveTop}>
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={styles.svgWave}
          >
            <path
              d="M0,0 C150,100 350,0 500,100 L500,0 Z"
              style={{ fill: "#7bbaf8ff" }}
            />
          </svg>
        </div>

        <main style={styles.content}>{children}</main>

        {/* Fondo inferior con ondas */}
        <div style={styles.waveBottom}>
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={styles.svgWave}
          >
            <path
              d="M0,100 C150,0 350,100 500,0 L500,150 L0,150 Z"
              style={{ fill: "#7bbaf8ff" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const styles = {
  deviceWrapper: {
    width: 375,
    height: 667,
    margin: "20px auto",
    border: "16px black solid",
    borderRadius: 40,
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  deviceScreen: {
    position: "relative" as "relative",
    width: 343,
    height: 635,
    background: "#fff",
    overflow: "hidden",
    borderRadius: 24,
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  waveTop: {
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 150,
    overflow: "hidden",
    zIndex: 0,
  },
  waveBottom: {
    position: "absolute" as "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 150,
    overflow: "hidden",
    zIndex: 0,
  },
  svgWave: {
    width: "100%",
    height: "100%",
  },
  content: {
    flexGrow: 1,
    width: "80%",
    marginTop: 120,
    marginBottom: 120,
    zIndex: 1,
  },
};
