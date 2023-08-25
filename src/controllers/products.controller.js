import { MongoDBProductManager } from "../dao/fsManager/product.manager.js";

const managerDB = new MongoDBProductManager();

export const limitHandlerController = async (request, response) => {
  response.send(await managerDB.limitHandler(request, response));
};

export const getProductByIdController = async (request, response) => {
  const id = Number(request.params.pid);
  await managerDB.getProductById(id, response);
};

export const addProductController = async (request, response) => {
  await managerDB.addProduct(request, response);
};

export const updateProductController = async (request, response) => {
  await managerDB.updateProduct(request, response);
};

export const deleteProductController = async (request, response) => {
  await managerDB.deleteProduct(request, response);
};