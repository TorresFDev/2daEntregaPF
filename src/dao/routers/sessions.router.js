import { Router } from "express";
import { userManager } from "../fsManager/users.manager.js";

const router = Router();
const managerUser = new userManager()

router.get("/registro", async (request, response) => {
  response.render("registro");
});

router.post("/registro", async (request, response) => {
    await managerUser.registerUser(request, response)
});

router.get("/login", async (request, response) => {
    response.render("login")
})

router.post("/login", async (request, response) => {
    await managerUser.loginSession(request, response)
})

router.post("/logout", async (request, response) => {
    await managerUser.logoutSession(request, response)
})

// vista de productos
router.get("/view", async (request, response) => {
    await managerUser.loginHandler(request, response)
  });

export default router;