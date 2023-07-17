import { Router } from "express";
import { productManagerDB } from "../fsManager/product.manager.js"

const router = Router();
// const manager = new ProductManager();

const managerDB = new productManagerDB()

router.get("/", async (request, response) => {
  response.send(await managerDB.limitHandler(request, response))
});

router.get("/:pid", async (request, response) => {
  const id = Number(request.params.pid);
  await managerDB.getProductById(id, response);
});

router.post("/", async (request, response) => {
  await managerDB.addProduct(request, response)
});

router.put("/:pid", async (request, response) => {
  await managerDB.updateProduct(request, response);
});

router.delete("/:pid", async (request, response) => {
  await managerDB.deleteProduct(request, response);
});

export default router;