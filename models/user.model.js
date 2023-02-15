import * as mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

UserSchema.pre('save', async (next) => {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)