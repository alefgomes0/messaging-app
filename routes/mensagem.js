require("express")
const router = express.Router();
const { mensagemGet, mensagemPost } =  require("../controllers/mensagemController");

router.get("/", mensagemGet)
router.post("/", mensagemPost);

module.exports = router
