import styles from "./CatSearch.module.css";
import catBackground from "../images/catBackground.jpg";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ResultContext } from "../main";

export default function CatSearch() {
    const [input, setInput] = useState("");
    const { setResult } = useContext(ResultContext);
    const navigate = useNavigate();

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleResult = async () => {
        if (input) {
            const config = {
                method: "GET",
                url: `${import.meta.env.VITE_API_URL}`,
                headers: {
                    "X-Api-Key": `${import.meta.env.VITE_API_KEY}`,
                },
                params: {
                    name: input.trim(),
                },
            };
            try {
                const response = await axios(config);
                setResult(response.data);
                navigate("/information");
            } catch (error) {
                console.error("Error fetching data:", error);
                setResult(null);
            }
        }
    };

    return (
        <div
            className={styles.background}
            style={{ backgroundImage: `url(${catBackground})` }}
        >
            <div className={styles.info}>
                <h1>Søk etter en katterase</h1>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Søk etter rase"
                        value={input}
                        onChange={handleInput}
                    />
                    <button onClick={handleResult}>Search</button>
                </div>
                <h2>Finn ut om en katterase er riktig for deg.</h2>
                <h2>Du må skrive det engelske navnet på rasen.</h2>
            </div>
        </div>
    );
}