import express from 'express';
import './services/chat';
import {getChatResponse} from "./services/chat";
import {search} from "./services/search";
import {upload} from "./services/upload";
import {docQuery} from "./services/docs";
import cors from 'cors';
import {Candidate, PrismaClient} from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


app.post('/chat', async (req, res) => {
  const message = req.body.message;
  const response = await getChatResponse(message);
  res.send(response);
});

app.post('/search', async (req, res) => {
  const query = req.body.query;
  if (!query) return res.status(200);

  const response = await search(query);
  res.send(response);
});

app.post('/upload', upload.single('file'), (req, res, next) => {
  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file
  });
});

app.post('/docs', async (req, res) => {
  const query = req.body.query;
  if (!query) return res.status(200);

  const response = await docQuery(query);
  res.send(response);
});

app.get('/can', async (req, res) => {
  const candidate: Candidate[] = await prisma.candidate.findMany();
  res.send(candidate);
});

app.get('/', (req, res) => {
  res.send('I am Alive!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
