
import { Router } from "express";
import { productManagerDB } from "../fsManager/product.manager";

const router = Router();
const managerDB = new productManagerDB();

router.get("/:cid", async (request, response) => {
  const result = await managerDB.limitHandler(request, response);
  response.render("products", result);
});

export default router;