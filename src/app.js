import express from "express";
import productRouter from "./routers/products.router.js"
import cartRouter from "./routers/carts.router.js"; 
import sessionsRouter from "./routers/sessions.router.js";
import mongoose  from "mongoose";
import handlebars from "express-handlebars";
import MongoStore from 'connect-mongo';
import session from "express-session";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import config from "./config/config.js";


const app = express();

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.url,
      dbName: config.mongo.db_name,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: config.mongo.secret,
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
// app.use("/products", viewRouter);
// ruta login
app.use("/api/sessions", sessionsRouter);

await mongoose.connect(config.mongo.url_db_name);

app.listen(config.apiserver.port, () => {
  console.log("Servidor Ejecutandose");
});

