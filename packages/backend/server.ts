import './utils/getEnv.js';
import { dbConnect } from "./config/db.js";
import express from "express";
import cors from "cors";
import router from "./routes/index.js";

dbConnect();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// credentials: true - для авторизации через куки
app.use(cors({
    origin: [String(process.env.VITE_FRONTEND), 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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