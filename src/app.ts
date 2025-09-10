import express from "express";
import userRoutes from "./routes/user.route";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(express.json());

app.use("/users", userRoutes);

export default app;
