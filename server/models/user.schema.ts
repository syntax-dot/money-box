import {defineMongooseModel} from '#nuxt/mongoose'
import {UserData} from "~/interfaces";

export const UserSchema = defineMongooseModel<UserData>({
    name: 'User',
    schema: {
        email: {
            type: 'string',
            unique: true,
        },
        password: {
            type: 'string',
        },
    },
    hooks(schema) {
        schema.pre('save', function (this, next) {

            if (this.password && this.email)
                next()

            throw createError({
                statusCode: 500,
                statusMessage: 'validation failed',
            })
        })
    },
})
