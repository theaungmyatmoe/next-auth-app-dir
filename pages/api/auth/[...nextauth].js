import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {connectToMongoDatabase} from "../../../utils/connect.util";
import bcrypt from "bcrypt";
import {User} from "../../../models/user.model";

const secret = process.env.NEXTAUTH_SECRET

connectToMongoDatabase()
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
        console.error("Failed to connect to MongoDB");
        console.error(error)
        process.exit(1);
    })


export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {

                const {email, password} = credentials;

                // const user = await User.findOne({email});
                //
                // if (!user) throw new Error("User not found");
                //
                // const isPasswordMatches = await bcrypt.compare(password, user.password);
                // if (!isPasswordMatches) throw new Error("Password is incorrect");

                return {
                    email,
                    password,
                }
                // return user;
            }
        })
    ],
    pages: {
        signIn: '/login',

    },
    secret,
}

export default NextAuth(authOptions)