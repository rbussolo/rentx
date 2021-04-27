import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";

const app = express();

// Adiciona camada para tratar requisições como JSON
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Adiciona as rotas da aplicação
app.use(router);

app.listen(3333, () => console.log("Server is runnig!"));
