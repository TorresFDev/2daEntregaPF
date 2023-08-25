import userModel from "../models/user.model.js";
import productsModel from "../models/products.model.js";
import { isValidPassword } from "../utils/utils.js"
export class userManager {
  constructor() {}

  readBD = async () => {
    return await userModel.find();
  };

  loginSession = async (request, response) => {
    const { email, password } = request.body;
    const validateEmailExits = await userModel.find({ email }).lean().exec();

    if (validateEmailExits.length === 0) {
      response.redirect("/api/sessions/registro");
      return;
    }

    let dbPassword = "";

    for (const iterator of validateEmailExits) {
      const { password } = iterator;
      dbPassword = password;
    }

    const validatePassword = isValidPassword(password, dbPassword);

    if (validatePassword === false) {
      response.status(400).json({
        message: "Usuario o contrase*a incorrecto",
      });
      return;
    }

    let first_nameCapture;
    let roleCapture;

    for (const iterator of validateEmailExits) {
      const { first_name, role } = iterator;
      first_nameCapture = first_name;
      roleCapture = role;
    }

    const user = {
      first_name: first_nameCapture,
      role: roleCapture,
    };

    request.session.user = user;
    response.redirect("/api/sessions/view");
  };

  logoutSession = async (request, response) => {
    request.session.destroy((err) => {
      if (err)
        return response.json({ status: "error", message: "Ocurrio un error" });
      else {
        response.redirect("/api/sessions/login");
      }
    });
  };

  loginHandler = async (request, response) => {
    const limit = Number(request.query.limit) || 10;
    const page = Number(request.query.page) || 1;
    const query = request.query.query || "";
    const sort = Number(request.query.sort) || "";

    const result = await productsModel.paginate(
      {},
      { page, limit, lean: true }
    );

    if (sort === 1) {
      const sortedDocsAsc = result.docs.sort((a, b) => a.price - b.price);
      result.docs = sortedDocsAsc;
    } else if (sort === -1) {
      const sortedDocsDesc = result.docs.sort((a, b) => b.price - a.price);
      result.docs = sortedDocsDesc;
    }

    if (query) {
      const filtrado = result.docs.filter((item) => item.category === query);
      result.docs = filtrado;
    }

    result.prevLink = result.hasPrevPage
      ? `/api/sessions/view/?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}`
      : null;
    result.nextLink = result.hasNextPage
      ? `/api/sessions/view/?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}`
      : null;

      const resultToSend = {
      status: "success",
      payload: { docs: result.docs },
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
    };

    const userName = request.session.user.first_name;

    let searchUser = await userModel.find({first_name: userName});
    let userRole = "";
    let cartId = ""

    for (const iterator of searchUser) {
      userRole = iterator.role;
      cartId = iterator.cart
    }

    const usuario = { user: userName, role: userRole, cart: cartId };

    resultToSend.users = usuario;

    response.render("products", resultToSend);
  };
  
  currentUser = async (request, response) => {
    let currentUser = request.session.user
    
    if (currentUser === undefined){
      currentUser = { message: "session not registered" }
    }
    response.send(currentUser)
  }
}


export default userManager;