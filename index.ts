import express, { Express, Request, Response } from "express";
import { Game } from "./game";
import bodyParser from 'body-parser';

const app: Express = express();
const port = 3000;
const game = new Game();
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send(game.board);
});
app.post("/move",(req: Request, res: Response) => {
    res.send(game.isValidState(req.body));
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});