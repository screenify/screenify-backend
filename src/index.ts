import config from "./config";
import { uploadToGoogleStorage } from "./cdn";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import cors from "cors";
import { errorHandler } from "./util/errorHandler";

/**
 * Express App
 */
let app = express();

/**
 * Middleware for disapling x - powered - by message
 */
// app.disable("x-powered-by");

app.use(
  json({
    limit: "50mb",
  })
);
/**
 * Middleware for handling server behind proxy e.g. Nginx
 */
app.enable("trust proxy");

/**
 * Cross Origin Sources middleware
 */
app.use(cors());

/**
 * middleware urlencoded not extended
 */
app.use(urlencoded({ extended: true }));

/**
 * @GET
 * static Api endpoint
 */
// app.get("/", (_, res) => {
//   //TODO: Add beter interface to show case screenify
//   res.send("Screenify");
// });

/**
 * @POST
 * /upload Api endpoint
 */
app.post(
  "/api/upload",
  async (req: Request, res: Response, next: NextFunction) => {
    const { buffer } = req.body;
    try {
      const imageUrl = await uploadToGoogleStorage(buffer);
      res.status(200);
      console.log();
      res.json({
        success: true,
        url: imageUrl,
      });
    } catch (error) {
      console.log("error ", error);
      next(error);
    }
  }
);

/**
 * Error Handler middleware
 */
app.use(errorHandler);

/**
 * Server Starter 🚀
 */
const PORT = config.port;

app.listen(PORT, () => {
  console.log("🚀 Connected to port ", PORT);
  console.log("Press Ctrl + C to stop the server ");
});
