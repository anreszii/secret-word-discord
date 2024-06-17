import express, { Application } from "express";
import cors from "cors";

const createApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  return app;
};

export default createApp;
