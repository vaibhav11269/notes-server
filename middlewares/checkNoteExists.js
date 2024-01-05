const models = require("../models");

const Note = models.note;

const checkNoteExist = async (req, res, next) => {
    try {
        let { id } = req.params;
        if (!(id)) {
            return res.status(400).json({
                success: false,
                message: "Missing Notes Id"
            });
        }
        let note = await Note.findOne({
            where: { id },
            raw: true
        });
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "No Note found with the given id"
            })
        }
        if (note && !note.is_active) {
            return res.status(404).json({
                success: false,
                message: "Note was deleted by the author"
            })
        }
        req.note = note;
        next();
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error.Failed to Fetch Note!!"
        })
    }
}

module.exports = checkNoteExist;