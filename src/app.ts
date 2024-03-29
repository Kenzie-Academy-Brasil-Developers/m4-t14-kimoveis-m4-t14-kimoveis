import "express-async-errors";
import express, { Application, json } from "express";
import { usersRoutes } from "./routes/users.routes";
import { handleErros } from "./errors/erros";
import { usersLoginRoutes } from "./routes/usersLogin.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { realEstateRoutes } from "./routes/realEstate.routes";
import { schedulesRoutes } from "./routes/schedules.routes";

const app: Application = express();

app.use(json());

app.use("", usersRoutes);
app.use("", usersLoginRoutes);
app.use("", categoriesRoutes);
app.use("", realEstateRoutes);
app.use("", schedulesRoutes);

app.use(handleErros);

export default app;
