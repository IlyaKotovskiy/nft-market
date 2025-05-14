import './utils/getEnv.js';
import { dbConnect } from "./config/db.js";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";

dbConnect();

const { SERVER_PORT } = process.env;

const app = express();
const PORT = SERVER_PORT || 3001;

// credentials: true - для авторизации через куки

app.use(cors({
    origin: 'https://openlake-nft.netlify.app',
    // credentials: true
}));
app.use(express.json());
app.use('/api', router);

app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
});

app.listen(PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
});