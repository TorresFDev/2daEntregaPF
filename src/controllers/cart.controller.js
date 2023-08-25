import { cartManagerDB } from "../dao/fsManager/cart.manager.js";

const managerDB = new cartManagerDB();

export const createCartController = async (request, response) => {
  managerDB.createCart(request, response);
};

export const getProductByIdController = async (request, response) => {
  const id = Number(request.params.cid);
  response.send(await managerDB.getProductById(id, response));
};

export const addProductInCartController = async (request, response) => {
  managerDB.addProductInCart(request, response);
};

export const deleteProductController = async (request, response) => {
  await managerDB.deleteProduct(request, response);
};

export const deleteProductsController = async (request, response) => {
  await managerDB.deleteProducts(request, response);
};

export const updateQtyController = async (request, response) => {
    await managerDB.updateQty(request, response);
  }

export const updateAllCartController = async (request, response) => {
    await managerDB.updateAllCart(request, response);
  }

export const getAllProductsInCartController = async (request, response) => {
    const id = Number(request.params.cid);
    const result = await managerDB.getProductById(id, response);
    response.render("cart", result);
  }