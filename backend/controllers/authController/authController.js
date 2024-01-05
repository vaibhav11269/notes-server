const models = require("../../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../services/tokenService");

const User = models.user;


module.exports = {
    register: async (req, res) => {
        try {
            let { firstName, lastName, email, password } = req.body;
            if (!(firstName || lastName || email || password)) {
                return res.status(400).json({
                    success: false,
                    message: "Missing Compulsory Data"
                });
            }
            let existingUser = await User.findOne({
                where: { email },
                raw: true
            });
            if (existingUser) {
                return res.status(401).json({
                    success: false,
                    message: "User already registerd with this email"
                })
            }
            let encryptedPass = await bcrypt.hash(password, 7);
            let newUser = await User.create({
                first_name: firstName,
                last_name: lastName,
                email,
                password: encryptedPass
            })
            res.status(201).json({
                success: true,
                message: "User signed up successfully"
            });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    },
    login: async (req, res) => {
        try {
            let { email, password } = req.body;
            if (!(email || password)) {
                return res.status(400).json({
                    success: false,
                    message: "Missing necessary details"
                });
            }
            let user = await User.findOne({
                where: { email },
                raw: true
            });
            if (user && (await bcrypt.compare(password, user.password))) {
                let token = await generateToken({ userId: user.id });
                user.password = undefined;

                return res.status(200).json({
                    success: true,
                    message: "Log in successful",
                    user, token
                })
            }
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}