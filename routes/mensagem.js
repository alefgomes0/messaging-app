import express from "express"
const router = express.Router();
import { mensagemGet, mensagemPost } from "../controllers/mensagemController";

router.get("/", mensagemGet)
router.post("/", mensagemPost);

export default router
