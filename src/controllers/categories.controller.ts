import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  getCategories,
  updateCategory,
  createCategory,
  destroyCategory,
  destroyRecordsCategory,
} from "../daos/category.dao";

const prisma = new PrismaClient();

export const index = async (req: Request, res: Response) => {
  const { page, limit, search } = req.query;

  const query: Prisma.CategoryFindManyArgs = {
    orderBy: { createdAt: "desc" },
  };

  if (page) query.skip = (Number(page) - 1) * Number(limit);
  if (limit) query.take = Number(limit);

  if (search && typeof search === "string") {
    query.where = {
      ...query.where,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    };
  }

  try {
    const categories = await getCategories(query);

    const total_item = await prisma.category.count();

    const last_page = Math.ceil(total_item / Number(limit));

    const current_page = Number(page);

    res.json({
      categories,
      meta: {
        last_page,
        current_page,
        total_item,
      },
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const create = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const category = await createCategory({
      ...data,
    });

    res.json({
      category,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const update = async (req: Request, res: Response) => {
  const { pk } = req.params;
  const data = req.body;

  try {
    const category = await updateCategory(Number(pk), {
      ...data,
    });

    res.json({
      category,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { pk } = req.params;

  try {
    await destroyCategory(Number(pk));

    res.json({
      message: "OK",
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const destroy_all = async (req: Request, res: Response) => {
  const { categories } = req.body;

  try {
    await destroyRecordsCategory(categories);

    res.json({
      message: "OK",
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};
