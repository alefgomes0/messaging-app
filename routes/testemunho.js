require("express")
const router = express.Router()
const { testemunhoGet } = require("../controllers/testemunhoController");

router.get("/", testemunhoGet)

export default router