import express from "express";
import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAunthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAunthenticated, getAllUsers);
  router.delete("users/:id", isAunthenticated, isOwner, deleteUser);
  router.patch("user/:id", isAunthenticated, isOwner, updateUser);
};
