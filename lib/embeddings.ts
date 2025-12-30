import { embed, embedMany } from "ai";
import { openai } from "@ai-sdk/openai";

export async function generateEmbedding(text: string) {
  const input = text.replace("n\n", "");

  const embeddingModel = openai.embedding("text-embedding-3-small");
  const {embedding} = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
}

export async function generateEmbeddings(texts: string[]) {
    const inputs = texts.map((text) => text.replace("n\n", ""));
  
    const embeddingModel = openai.embedding("text-embedding-3-small");
    const {embeddings} = await embedMany({
      model: embeddingModel,
      values: inputs,
    });
    return embeddings;
  }