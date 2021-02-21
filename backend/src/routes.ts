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
routes.post("/forgot", UsersController.forgot);
routes.post("/reset", UsersController.reset);

routes.post("/orphanages", upload.array("images"), OrphanagesController.create);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.get("/orphanages", OrphanagesController.index);



// routes.use(authMiddleware);
routes.post("/orphanage/delete/:id", OrphanagesController.delete);
routes.get("/pending", OrphanagesController.indexPending);
routes.put("/pending/:id", OrphanagesController.pending);
routes.put("/orphanage/edit", upload.array("images"), OrphanagesController.update);

routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/register", UsersController.create);
routes.put("/user", UsersController.update);
routes.post("/user/delete/:id", UsersController.delete);





export default routes;
