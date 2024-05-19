import 'dotenv/config'
import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from "@langchain/openai";


import OpenAI from 'openai'

// create an OpenAi instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Temporarily store the movies in memory
const movies = [
  {
    id: 1,
    title: 'Stepbrother',
    description: `Comedic journey full of adult humor and awkwardness.`,
  },
  {
    id: 2,
    title: 'The Matrix',
    description: `Deals with alternate realities and questioning what's real.`,
  },
  {
    id: 3,
    title: 'Shutter Island',
    description: `A mind-bending plot with twists and turns.`,
  },
  {
    id: 4,
    title: 'Memento',
    description: `A non-linear narrative that challenges the viewer's perception.`,
  },
  {
    id: 5,
    title: 'Doctor Strange',
    description: `Features alternate dimensions and reality manipulation.`,
  },
  {
    id: 6,
    title: 'Paw Patrol',
    description: `Children's animated movie where a group of adorable puppies save people from all sorts of emergencies.`,
  },
  {
    id: 7,
    title: 'Interstellar',
    description: `Features futuristic space travel with high stakes`,
  },
]

const createStore = () =>
    MemoryVectorStore.fromDocuments(
        // Convert the movies into langChain documents
        movies.map(
            (movie) =>
                new Document({
                  // page content will convert to vectors
                  pageContent: `Title: ${movie.title}\n${movie.description}`,
                  metadata: { source: movie.id, title: movie.title },
                })
        ),
        new OpenAIEmbeddings()
    )

export const search = async (query: string, count: number = 3) => {
  const store = await createStore();
  // more methods for searching are available
  // example: store.similaritySearchWithScore(query, count);
  return store.similaritySearch(query, count);
}
