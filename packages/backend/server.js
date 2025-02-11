import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/api/v1')
});

app.get('/api/v1', (req, res) => {
    res.send({ msg: "NFT Marketplace API is running!" })
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));