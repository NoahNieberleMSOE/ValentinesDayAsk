import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Grid, Button, Box, Typography, Modal, Fade, Backdrop } from "@mui/material";
import Confetti from "react-confetti";
import noahImg from "./assets/noah.jpg";
import emilyImg from "./assets/emily.jpg";

import "./App.css";

function App() {

    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [showConfetti, setShowConfetti] = useState(false);
    const [openModal, setOpenModal] = useState(false);



    useEffect(() => {
        document.title = "Be My Valentine 💖";
    }, []);

    const handleNoHover = () => {
        const padding = 100; // Prevents button from getting too close to edges
        const maxX = window.innerWidth;
        const maxY = window.innerHeight;



        let elem = document.getElementById("NoButton")!;
        let rect = elem.getBoundingClientRect();


        let relativeMaxX = (maxX - rect.x)
        let relativeMaxY = (maxY - rect.y)

        let randomnessX = (Math.random() * relativeMaxX * (Math.random() > 0.5 ? 1 : -1))
        let randomnessY = (Math.random() * relativeMaxY * (Math.random() > 0.5 ? 1 : -1))


        let absoluteNewX = randomnessX + rect.x
        let absoluteNewY = randomnessY + rect.y

        if (absoluteNewX > window.innerWidth - padding) {
            randomnessX = (window.innerWidth - rect.x - 300) * -1
        }
        if (absoluteNewX + padding < 0) {
            randomnessX = (window.innerWidth - rect.x - 300)
        }

        if (absoluteNewY > window.innerHeight - padding) {
            randomnessY = (window.innerHeight - rect.y - 300) * -1
        }
        if (absoluteNewY + padding < 0) {
            randomnessY = (window.innerHeight - rect.y - 300)
        }

        setNoPosition({
            x: randomnessX,
            y: randomnessY
        });

    };



    const handleYesClick = () => {
        setShowConfetti(true);
        setOpenModal(true);
        setTimeout(() => setShowConfetti(false), 5000);
    };

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #FFB6C1, #FF69B4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: 3, width: "100%" }}>
                <Grid item>
                    <Box component="img"
                        src={noahImg}
                        alt="Noah"
                        sx={{ width: "20vw", borderRadius: 2 }}
                    />
                </Grid>
                <Grid item>
                    <Box component="img"
                        src={emilyImg }
                        alt="Emily"
                        sx={{ width: "20vw", borderRadius: 2 }}
                    />
                </Grid>
            </Grid>

            <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center", color: "white", mt: 4 }}>
                Will you be my Valentine? 💖
            </Typography>

            <Grid container justifyContent="center" alignItems="center" spacing={3} sx={{ mt: 3 }}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ fontSize: 20, px: 4, py: 1.5, bgcolor: "#FF4081", ":hover": { bgcolor: "#E91E63" } }}
                        onClick={handleYesClick}
                    >
                        Yes! 😊
                    </Button>
                </Grid>
                <Grid item>
                    <motion.div
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        transition={{ type: "spring", stiffness: 100 }}
                        onMouseEnter={handleNoHover}
                        style={{ position: "relative"}}

                    >
                        <Button variant="contained" color="error" sx={{ fontSize: 20, px: 4, py: 1.5 }} id = "NoButton">
                            No 😢
                        </Button>
                    </motion.div>
                </Grid>
            </Grid>

            {/* MODAL - Shows when "Yes!" is clicked */}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openModal}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "white",
                            borderRadius: 3,
                            p: 4,
                            width: "80%",
                            maxWidth: "400px",
                            textAlign: "center",
                            boxShadow: 24,
                        }}
                    >
                        <Typography variant="h4" sx={{ color: "#FF4081", fontWeight: "bold" }}>
                            Huzzah! 💖
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Can't wait to celebrate! 🥰
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{ mt: 3, bgcolor: "#FF4081", ":hover": { bgcolor: "#E91E63" } }}
                            onClick={() => setOpenModal(false)}
                        >
                            Close
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

export default App;
