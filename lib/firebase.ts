import { getApps, initializeApp } from "firebase/app"
import { getStorage, ref } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.FIREBASEAPIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.BUCKET,
    messagingSenderId: "805562169316",
    appId: "1:805562169316:web:eae1453cc954849db3f9f1",
    measurementId: "G-FZ4N0PNS32"
}


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

const storage = getStorage(app)
export const storageRef = (token: string) => ref(storage, token)

