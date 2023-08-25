import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/user.model.js";
import { createHash } from "../dao/utils/utils.js";
import cartModel from "../dao/models/cart.model.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.0541cf572c5e8e22",
        clientSecret: "3feb8f736830e335c9e65d0358b8b3ff935251a5",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let emailInDb = profile._json.email;
          let emailInDbString;

          if (emailInDb === null) {
            emailInDb = profile._json.id;
            emailInDbString = JSON.stringify(emailInDb);
          }

          const user = await userModel.findOne({ email: emailInDbString });

          let requestOptions = {
            method: "POST",
          };
          // creo el carrito de compras para asociarlo al usuario que se va a crear
          fetch("http://localhost:8080/api/cart/", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

          setTimeout(async () => {
            let readFile = await cartModel.find();
            let cartId = readFile[readFile.length - 1].id;

            if (user) return done(null, user);

            if (user === null) {
              const newUser = await userModel.create({
                first_name: profile._json.login,
                last_name: "NA",
                email: emailInDb,
                age: 0,
                password: "github",
                cart: cartId,
                role: "usuario",
              });
              return done(null, newUser);
            }
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (request, username, password, done) => {
        try {
          const { first_name, last_name, email, age } = request.body;
          const passwordHash = createHash(password);

          let validateData = await userModel.find();
          const validateEmail = validateData.filter(
            (item) => item.email === username
          );

          if (validateEmail.length === 1) {
            console.log("existe el usuario");
            done(null, false);
            return;
          }

          let requestOptions = {
            method: "POST",
          };

          // creo el carrito de compras para asociarlo al usuario que se va a crear
          fetch("http://localhost:8080/api/cart/", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

          setTimeout(async () => {
            let readFile = await cartModel.find();
            let cartId = readFile[readFile.length - 1].id;

            const newUser = await userModel.create({
              first_name,
              last_name,
              email,
              age,
              password: passwordHash,
              cart: cartId,
              role: "usuario",
            });

            return done(null, newUser);
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
