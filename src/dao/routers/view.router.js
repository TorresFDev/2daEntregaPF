import { Router } from "express";
import { productManagerDB } from "../fsManager/product.manager.js";

const router = Router();
const managerDB = new productManagerDB();

router.get("/", async (request, response) => {
  const result = await managerDB.limitHandler(request, response);
  response.render("products", result);
});

export default router;