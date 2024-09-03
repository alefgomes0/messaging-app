import express from "express";
const router = express.Router()
import { testemunhoGet } from "../controllers/testemunhoController";

router.get("/", testemunhoGet)

export default router