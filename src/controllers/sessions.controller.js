import { userManager } from "../dao/fsManager/users.manager.js";

const managerUser = new userManager();

export const registryController = async (request, response) => {
    response.render("registro");
  }

export const loginSessionController = async (request, response) => {
  await managerUser.loginSession(request, response);
};

export const logoutSessionController = async (request, response) => {
  await managerUser.logoutSession(request, response);
};

export const loginHandlerController = async (request, response) => {
  await managerUser.loginHandler(request, response);
};

export const currentUserController = async (request, response) => {
  await managerUser.currentUser(request, response);
};

export const registerController = async (request, response) => {
  response.redirect("/api/sessions/login");
};

export const failRegisterController = async (request, response) => {
    response.send("el usuario registrado ya existe");
  }

export const loginController = async (request, response) => {
    response.render("login");
  }

export const githubController = async (request, response) => {}

export const githubCallbackController = async(request, response) => {
    request.session.user = request.user
    response.redirect("/api/sessions/view");
}