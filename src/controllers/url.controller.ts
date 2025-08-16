import { z } from "zod";
import { CacheRepository } from "../repositories/cache.repository";
import { UrlRepository } from "../repositories/url.repository";
import { publicProcedure } from "../routers/trpc/context";
import { UrlService } from "../services/url.service";
import logger from "../config/logger.config";
import { InternalServerError } from "../utils/errors/app.error";
import { Request, Response, NextFunction } from "express";

const urlService = new UrlService(new UrlRepository(), new CacheRepository());

export const urlController = {
  create: publicProcedure
    .input(
      z.object({
        originalUrl: z.string().url("Invalid URL"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await urlService.createShortUrl(input.originalUrl);
        return result;
      } catch (error) {
        logger.error("Error getting original URL", error);
        throw new InternalServerError("Failed to get original URL");
      }
    }),

  getOriginalUrl: publicProcedure
    .input(
      z.object({
        shortUrl: z.string().min(1, "Short URL is required"),
      })
    )
    .query(async ({ input }) => {
      try {
        const result = await urlService.getOriginalUrl(input.shortUrl);
        console.log(result);
        return result;
      } catch (error) {
        logger.error("Error getting original URL", error);
        throw new InternalServerError("Failed to get original URL");
      }
    }),
};

export async function redirectUrl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { shortUrl } = req.params;

  const url = await urlService.getOriginalUrl(shortUrl);

  if (!url) {
    res.status(404).json({
      success: false,
      message: "URL not found",
    });
    return;
  }

  await urlService.incrementClicks(shortUrl);

  res.redirect(url.originalUrl);
}
