const express = require("express")
const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")
const { addWork, getWork, getStats, deleteWork, updateWork } = require("../controllers/workController")

router.post("/add", authMiddleware, addWork)
router.get("/", authMiddleware, getWork)
router.get("/stats", authMiddleware, getStats)
router.delete("/:id", authMiddleware, deleteWork)
router.put("/:id", authMiddleware, updateWork )

module.exports = router