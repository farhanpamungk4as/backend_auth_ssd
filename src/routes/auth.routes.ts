import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router();

router.post("/register", (req, res, next) => {
  console.log("Register endpoint hit!");
  console.log("Request body:", req.body); // Log request body
  next();
}, AuthController.register);
router.get("/users", AuthController.getUsers);


router.post("/login", AuthController.login);
router.put("/users/:id", (req, res, next) => {
  console.log("PUT /users/:id hit!");
  console.log("Request Params:", req.params);
  console.log("Request Body:", req.body);
  next();
}, AuthController.updateUser);

router.delete("/users/:id", (req, res, next) => {
  console.log("DELETE /users/:id hit!");
  console.log("Request Params:", req.params);
  next();
}, AuthController.deleteUser);



export default router;
