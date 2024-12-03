import OpenAI from 'openai/index.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;