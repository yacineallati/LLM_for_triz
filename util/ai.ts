import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import {
  StructuredOutputParser,
  OutputFixingParser,
} from 'langchain/output_parsers'
import { Document } from 'langchain/document'
import { z } from 'zod'
import * as fs from 'fs'





const parser = StructuredOutputParser.fromZodSchema(
  z.object({
  primary_contradiction: z
  .string()
  .describe(`Identify the primary contradictions in the problem`),
  secondary_contradiction: z
  .string()
  .describe(`what's the secondary contradictions in the problem ?`),
  Triz_principles: z
  .string()
  .describe(`what are the triz principles based on the contradiction? based the contradictions you just gave me and the entry.`),
  Innovative_Solutions: z
  .string()
  .describe(`give me inovative solutions based the triz principles you just gave me and the entry.`),
  Benefits: z
  .string()
  .describe(`the anticipated benefit of the solution you just gave me.`),
  Risks: z
  .string()
  .describe(`the risk and challenge of the solution you just gave me.`),
 
  })
)


// this is the prompt used to generate the output
const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()
    const prompt = new PromptTemplate({
    template:
          `Analyse the following problem statement using triz analysis. Follow the intrusctions and format your response to match the format instructions, no matter what! \m{format_instructions}\n{entry} `,
        
        inputVariables: ['entry'],
      partialVariables: { format_instructions },
    })
    const input = await prompt.format({
        entry: content,
      })   
    console.log(input)
    return input
}


// generate output from input using the model GPT-3.5-turbo
export const analyze = async (entry) => {
    const input = await getPrompt(entry.content)
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    const output = await model.call(input)
    console.log(output)
    try {
      return parser.parse(output)
    } catch (e) {
      const fixParser = OutputFixingParser.fromLLM(
        new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
        parser
      )
      const fix = await fixParser.parse(output)
      return fix
    }
  }
export const qa = async (question, entries) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { source: entry.id, date: entry.createdAt },
      })
  )
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}