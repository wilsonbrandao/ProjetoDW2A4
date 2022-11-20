const express = require('express')
import cors from "cors";
import { routes } from "./route";


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
    console.log("HTTP server running");
});


