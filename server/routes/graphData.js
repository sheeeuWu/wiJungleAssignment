import express from "express";

import { getGraphData } from "../controllers/graphData.js";

const router = express.Router();

router.get("/getdata", getGraphData);
export default router;