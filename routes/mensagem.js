require("express")
const router = express.Router();
const { mensagemGet, mensagemPost } =  require("../controllers/mensagemController");

router.get("/", mensagemGet)
router.post("/", mensagemPost);

export default router
