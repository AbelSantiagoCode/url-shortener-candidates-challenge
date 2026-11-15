import { Router } from "express";
import { container } from "../../Infrastructure/DependencyInjection/container.js";
import { UrlController } from "../Controllers/UrlController.js";

const router = Router();
const controller = container.resolve(UrlController);
router.post("/urls", controller.create);
router.get("/urls", controller.list);
router.delete("/urls/:id", controller.delete);
router.get("/:code", controller.redirect);
export { router as urlRoutes };
