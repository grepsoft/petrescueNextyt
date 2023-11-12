import { User } from "@/types";
import { Schema, models, model } from "mongoose";


const UserSchema = new Schema<User>({

    firstname: {
        type: String,
        get: toCamelCase
    },

    lastname: {
        type: String,
        get: toCamelCase
    },
    email: String,
    password: String
}, {
    toJSON: { getters: true}
});

UserSchema.virtual('fullName', {
    getters: true
}).get(function() {
    return `${this.firstname} ${this.lastname}`
})

function toCamelCase(text: string): any {
    return `${text.at(0)?.toUpperCase()}${text.substring(1, text.length)}`;
}

export const UserModel = models.User || model('User', UserSchema)