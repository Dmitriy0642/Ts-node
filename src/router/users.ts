import express from "express";
import { deleteUser, getAllUsers } from "../controllers/users";
import { isAunthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAunthenticated, getAllUsers);
  router.delete("users/:id", isOwner, deleteUser);
};
