import express from "express";
import productRouter from "./dao/routers/products.router.js"
import cartRouter from "./dao/routers/carts.router.js"; 
import mongoose  from "mongoose";
import handlebars from "express-handlebars";
// import viewRouter from "./dao/routers/view.router.js";
import MongoStore from 'connect-mongo'
import session from "express-session";
import sessionsRouter from "./dao/routers/sessions.router.js"

const app = express();

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/dao/views");
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: MongoStore.create({
      mongoUrl: 'mongodb+srv://coder:coder@cluster0.i2hgwbg.mongodb.net/',
      dbName: 'sessions',
      mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }
  }),
  secret: 'victoriasecret',
  resave: true,
  saveUninitialized: true
}))

app.use("/api/products", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/sessions", sessionsRouter)

// app.use("/products", viewRouter);

await mongoose.connect(
  "mongodb+srv://coder:coder@cluster0.i2hgwbg.mongodb.net/ecommmerce"
);

const httpServer = app.listen(8080, () => {
  console.log("Server On!");
});



