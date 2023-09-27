import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToke } from "../db/users";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity_id") as string;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const isAunthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["Auth"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const existingUser = await getUserBySessionToke(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }
    merge(req, { indentity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
