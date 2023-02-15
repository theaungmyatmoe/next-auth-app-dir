import {connectToMongoDatabase} from "../../utils/connect.util";
import {User} from "../../models/user.model";

export default async function handler(req, res) {
    await connectToMongoDatabase();

    if (req.method === "POST") {
        try {

            const {name, username, password} = req.body;

            const user = new User({name, username, password})

            res.status(201).json({message: "User created successfully", user,});
        } catch (e) {
            res.status(500).json({message: "Something went wrong", error: e})
        }
    }
}
