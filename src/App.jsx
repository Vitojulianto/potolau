import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Confetti from "react-confetti";

Modal.setAppElement("#root");

const photos = [
  { src: "/l1.jpeg", message: "Your Smile is daabesttt 😍" },
  { src: "/l2.jpeg", message: "You are better than yesterday ❤️" },
  { src: "/l3.jpeg", message: "Cantikknyooooo 🥰" },
  { src: "/l4.jpeg", message: "Jangan betmut betmutt muluuuuu ✨" },
  { src: "/l5.jpeg", message: "No bad mood can resist your smile 😍" },
  { src: "/l6.jpeg", message: "Remember my word: Tenang, ada gw 💕" }
];

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [typedText, setTypedText] = useState("");

  // Efek typing untuk pesan
  useEffect(() => {
    if (selectedPhoto) {
      let i = 0;
      setTypedText("");
      const interval = setInterval(() => {
        setTypedText(selectedPhoto.message.slice(0, i + 1));
        i++;
        if (i === selectedPhoto.message.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [selectedPhoto]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💖 Oiiii Laura 💖</h1>
      <p style={styles.subtitle}>Click one of the photo to see secret massege ✨</p>

      <div style={styles.gallery}>
        {photos.map((photo, index) => (
          <div key={index} style={styles.card} onClick={() => setSelectedPhoto(photo)}>
            <img src={photo.src} alt="Laura" style={styles.photo} />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      <Modal
        isOpen={!!selectedPhoto}
        onRequestClose={() => setSelectedPhoto(null)}
        style={modalStyles}
      >
        {selectedPhoto && (
          <div style={styles.modalContent}>
            <Confetti recycle={false} numberOfPieces={250} />
            <img src={selectedPhoto.src} alt="Laura" style={styles.modalImg} />
            <p style={styles.message}>{typedText}</p>
            <button style={styles.button} onClick={() => setSelectedPhoto(null)}>
              Tutup ✨
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 10s ease infinite",
  },
  title: {
    fontSize: "3rem",
    margin: "20px 0 10px 0",
    color: "#fff",
    textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
  },
  subtitle: {
    color: "#fff",
    fontSize: "1.3rem",
    marginBottom: "25px",
    fontStyle: "italic",
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: {
    overflow: "hidden",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
  },
  photo: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    display: "block",
  },
  modalContent: {
    textAlign: "center",
  },
  modalImg: {
    width: "100%",
    height: "auto",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "20px",
    marginBottom: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
  },
  message: {
    fontSize: "1.6rem",
    color: "#ff4081",
    fontWeight: "600",
    margin: "15px 0 20px 0",
    lineHeight: "1.6",
    textShadow: "1px 1px 5px rgba(0,0,0,0.2)",
  },
  button: {
    marginTop: "15px",
    padding: "12px 25px",
    background: "linear-gradient(90deg, #ff4081, #ff6f91)",
    color: "white",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
    transition: "transform 0.2s",
  },
};

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    borderRadius: "25px",
    padding: "30px",
    maxWidth: "600px",
    width: "90%",
    background: "linear-gradient(to bottom, #fff, #ffe6f0)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
  },
};

// Animasi background
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes gradientBG {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}`, styleSheet.cssRules.length);
