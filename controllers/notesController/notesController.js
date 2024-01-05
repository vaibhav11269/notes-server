const models = require("../../models");
const { Op } = require('sequelize');
const Note = models.note;
const ShareNote = models.sharedNote;

module.exports = {
    allNotes: async (req, res) => {
        try {
            // console.log("req.userId", req.userId)
            let notes = await Note.findAll({
                where: { is_active: true },
                raw: true
            });
            res.status(200).json({
                success: true,
                message: "All notes fecthed successfully",
                notes
            })
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error.Failed to Fetch Notes!!"
            })
        }
    },
    addNewNote: async (req, res) => {
        try {
            let { title, description, tags } = req.body;
            console.log("tgas", tags)
            if (!(title || description)) {
                return res.status(400).json({
                    success: false,
                    message: "Missing Compulsory Data"
                });
            }
            let newNote = await Note.create({
                user_id: req.userId,
                title,
                description,
                tags: tags,
                is_active: true
            });
            res.status(201).json({
                success: true,
                message: "New note added successfully",
                newNote
            })
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error.Failed to Fetch Notes!!"
            })
        }
    },
    getNoteById: async (req, res) => {
        try {
            let note = req.note;
            res.status(200).json({
                success: true,
                message: "Note details fetched successfully",
                note
            })
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error.Failed to Fetch Note!!"
            })
        }
    },
    updateNoteById: async (req, res) => {
        try {
            let { id } = req.params;
            let { title, description } = req.body;
            let note = req.note;

            if (!(title)) {
                return res.status(400).json({
                    success: false,
                    message: "No Data provided for updating the note"
                });
            }
            description = description || note.description
            await Note.update(
                { title, description },
                { where: { id } }
            )
            note.title = title;
            note.description = description;
            res.status(200).json({
                success: true,
                message: "Note details updated successfully",
                note
            })
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error.Failed to Update Note!!"
            })
        }
    },
    deleteNoteById: async (req, res) => {
        try {
            let { id } = req.params;
            let note = req.note;

            await Note.update(
                { is_active: false },
                { where: { id } }
            )
            note.is_active = false;

            res.status(200).json({
                success: true,
                message: "Note deleted successfully",
                note
            })
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error.Failed to Fetch Notes!!"
            })
        }
    },
    shareNote: async (req, res) => {
        try {
            let note = req.note;
            let { shareTo } = req.body;

            if (shareTo === req.userId) {
                return res.status(429).json({
                    success: false,
                    message: "Cannot share the note to yourself"
                });
            }
            await ShareNote.create({
                shared_by: req.userId,
                shared_to: shareTo,
                note_id: note.id
            })
            res.status(200).json({
                success: true,
                message: "Note details shared successfully",
            })
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error.Failed to Fetch Note!!"
            })
        }
    },
    searchNote: async (req, res) => {
        try {
            let { q } = req.query;
            
            if (!q) {
                return res.status(400).json({
                    success: false,
                    message: "Missing Tags Parameter"
                });
            }
            const filteredNotes = await Note.findAll({
                where: {
                    tags: {
                        [Op.contains]: [q]
                    }
                },
                raw: true
            });
            res.status(200).json({
                success: true,
                message: "Notes with search keywords fetched",
                filteredNotes
            });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error.Failed to Fetch Note!!"
            })
        }
    }
}