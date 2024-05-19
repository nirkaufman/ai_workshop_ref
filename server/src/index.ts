import express from 'express';
import './services/chat';
import {getChatResponse} from "./services/chat";
import {search} from "./services/search";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const message = req.body.message;
  const response = await getChatResponse(message);
  res.send(response);
});

app.post('/search', async (req, res) => {
  const query = req.body.query;
  const response = await search(query);
  res.send(response);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
