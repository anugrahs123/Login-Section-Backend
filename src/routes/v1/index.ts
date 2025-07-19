const express = require("express");
import authRoutes from "./../../app/auth/auth.route";
const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
