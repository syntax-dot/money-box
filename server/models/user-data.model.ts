import { defineMongooseModel } from "#nuxt/mongoose";

export const UserData = defineMongooseModel({
    name: 'UserData',
    schema: {
        address: {
            type: String,
            required: true,
            unique: true,
        },
        balance: {
            type: String,
            required: true,
        },
        targetBalance: {
            type: String,
            required: true,
        },
        target: {
            type: String,
            required: true,
        },
        autoupdate: {
            type: Boolean,
            required: true,
        },
    },
    options: {

    },
    hooks(schema) {

    },
})
