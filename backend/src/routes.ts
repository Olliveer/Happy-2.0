import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/upload";
import OrphanagesController from "./controllers/OrphanagesController";
import UsersController from "./controllers/UsersController";

const routes = Router();
const upload = multer(uploadConfig);
import authMiddleware from "./middlewares/auth";

process.on("unhandledRejection", (err) => console.error(err));

// MVC

// Model
// Views
// Controllers

//Sign In, Sign Up 
routes.post("/login", UsersController.authenticate);

routes.post("/orphanages", upload.array("images"), OrphanagesController.create);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.get("/orphanages", OrphanagesController.index);
routes.get("/pending", OrphanagesController.indexPending);


// routes.use(authMiddleware);
routes.post("/register", UsersController.create);
routes.get("/users/:id", UsersController.show);
routes.post("/orphanage/delete/:id", OrphanagesController.delete);




export default routes;
