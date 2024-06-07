import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import graphDataRoutes from "./routes/graphData.js";

/* data imports */ 
import GraphData from './models/GrapgData.js';
import { chartData } from './data/index.js'

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(cors());

/*Routes*/
app.use("/", graphDataRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    /* ONLY ADD DATA ONE TIME */ 
    GraphData.insertMany(chartData);
})
.catch((error) => console.log(`${error} did not connect`));
