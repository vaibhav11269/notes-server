const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController/notesController");
const validateToken = require("../middlewares/JwtTokenValidator");
const checkNoteExist = require("../middlewares/checkNoteExists");

router.use(validateToken);

///crud operations on notes
router.get("/", notesController.allNotes);
router.post("/", notesController.addNewNote);
router.get("/search", notesController.searchNote);
router.get("/:id", checkNoteExist, notesController.getNoteById);
router.put("/:id", checkNoteExist, notesController.updateNoteById);
router.delete("/:id", checkNoteExist, notesController.deleteNoteById);

///share and search functionality for notes
router.post("/:id/share", checkNoteExist, notesController.shareNote);

module.exports = router;