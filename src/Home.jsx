function Home() {
  return (
    <div style={{ position: "relative" }}>
      <p
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          color: "black",
          textAlign: "center",
          background:"beige",
          padding:"50px",
          borderRadius:"20px",
          border: "solid black",
          width:"70%",
          fontSize:"2em"
        }}
      >
        Welcome to your library! Open the menu dropdown to make changes...
      </p>
      <img
        src="images/background.jpeg"
        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        alt="Background"
      />
    </div>
  );
}

export default Home;
