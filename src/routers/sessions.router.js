import { Router } from "express";
import passport from "passport";
import {
  loginSessionController,
  logoutSessionController,
  loginHandlerController,
  currentUserController,
  registerController,
  failRegisterController,
  loginController,
  registryController,
  githubCallbackController,
  githubController,
} from "../controllers/sessions.controller.js";

const router = Router();

router.get("/registro", registryController);
router.post("/registro", passport.authenticate("register", {failureRedirect: "/api/sessions/failRegister",}), registerController);
router.get("/failRegister", failRegisterController);
router.get("/login", loginController);
router.post("/login", loginSessionController);
router.post("/logout", logoutSessionController);
//esta muestra la vista de productos
router.get("/view", loginHandlerController);
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), githubController);
router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/api/sessions/failRegister",}), githubCallbackController);
router.get("/current", currentUserController);

export default router;