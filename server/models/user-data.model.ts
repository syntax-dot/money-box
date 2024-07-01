import { Schema, model } from "mongoose";

const UserDataSchema = new Schema({
    address: String,
    balance: String,
    targetBalance: String,
    target: String,
    autoupdate: Boolean,
});

export const UserData = model("UserData", UserDataSchema);
