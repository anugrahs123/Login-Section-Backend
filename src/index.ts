import app from "./app";
import { Server } from "http";
import config from "./config/config";

const server: Server = app.listen(config.PORT, () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});
