import dotenv from "dotenv"
dotenv.config()

export default {
    apiserver: {
        port: process.env.PORT
    },
    mongo: {
        url: process.env.MONGO_URL,
        url_db_name: process.env.MONGO_URL_W_DB_NAME,
        db_name: process.env.DB_NAME,
        secret: process.env.SECRET
    }
}