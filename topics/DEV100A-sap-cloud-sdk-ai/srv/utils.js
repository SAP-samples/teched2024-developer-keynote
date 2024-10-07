import { AzureOpenAiChatClient, AzureOpenAiEmbeddingClient } from '@sap-ai-sdk/langchain'
import * as fs from 'node:fs'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const path = require('path')
const imageFilePath = 'db/data/overview-page.png'

import cds from '@sap/cds'
const { INSERT, DELETE } = cds.ql
const { DocumentSplits, RAGResponses } = cds.entities
const chatModelName = 'gpt-4o-mini'
const embeddingModelName = 'text-embedding-ada-002'
const s_text = 's_text'
const s_test = 's_test'
const s_image = 's_image'
const s_backup = 's_backup'

/**
 * Executes a RAG request to a given chat model.
 * Current chat model: gpt-4o.
 * @param {string} user_query - The user query for the chat model.
 * @param {string} user_query - The demo scenario
 * @returns {[string, string]} - Array of Strings containing the user query and the chat model's RAG response.
 */
export async function executeRAG(user_query, scenarioIn) {
  try {
    const embeddingClient = new AzureOpenAiEmbeddingClient({
      modelName: embeddingModelName,
      maxRetries: 0,
    })

    let embedding = await embeddingClient.embedQuery(user_query)

    let splits = await SELECT.from(DocumentSplits).where(DocumentSplits.scenario == scenarioIn)
      .orderBy`cosine_similarity(embedding, to_real_vector(${embedding})) DESC`

    let text_chunk = splits[0].text_chunks

    const message = {
      role: 'user',
      content: [
        {
          type: 'text',
          text:
            ` You are an assistant for UI developers. You are receiving a user query to find the correct floorplan to use for the application. Consider context 1 when deciding which floorplan fits best to the users input query. Consider all the input before responding. context: ${text_chunk}` +
            user_query,
        },
      ],
      context: text_chunk,
    }

    const chatClient = new AzureOpenAiChatClient({
      modelName: chatModelName,
      maxRetries: 0,
    })

    let ragResponse = await chatClient.invoke([message])

    return [user_query, ragResponse.content, scenarioIn]
  } catch (error) {
    console.log(`Error while executing RAG: ${error.toString()}`)
    throw error
  }
}

/**
 *
 * @param {*} req
 */
export async function executeRagWithImage(user_query, scenarioIn) {
  try {
    const embeddingClient = new AzureOpenAiEmbeddingClient({
      modelName: embeddingModelName,
      maxRetries: 0,
    })

    let embedding = await embeddingClient.embedQuery(user_query)

    let splits = await SELECT.from(DocumentSplits).where(DocumentSplits.scenario == scenarioIn)
      .orderBy`cosine_similarity(embedding, to_real_vector(${embedding})) DESC`

    let text_chunk = splits[0].text_chunks

    let imageEmbeddingEntry = splits.filter((x) => x.image && x.image_context)[0]

    let image = imageEmbeddingEntry.image
    let imageContext = imageEmbeddingEntry.image_context

    const message = {
      role: 'user',
      content: [
        {
          type: 'text',
          text:
            ` You are an assistant for UI developers. You are receiving a user query to find the correct floorplan to use for the application. Consider context 1, context 2 and the provided image when deciding which floorplan fits best to the users input query. Consider all the input before responding. context 1: ${text_chunk}, context 2: ${imageContext}` +
            user_query,
        },
        {
          type: 'image_url',
          image_url: {
            url: `data:image/png;base64,${image}`,
          },
        },
      ],
    }

    const chatClient = new AzureOpenAiChatClient({
      modelName: chatModelName,
      maxRetries: 0,
    })

    let ragResponse = await chatClient.invoke([message])
    const binaryData = await Buffer.from(image, 'base64')

    return [user_query, ragResponse.content, scenarioIn, binaryData]
  } catch (error) {
    console.log(`Error while creating image description: ${error.toString()}`)
    throw error
  }
}

/**
 * Create the object entry for the DB insert for the RAG response and user query.
 * @param {[string]} - The RAG response and user query
 * @param {string} scenario - The demo scenario flag.
 * @returns {RAGResponses} - The DB entry object RAGResponses.
 */
export function createRAGEntry([userQuery, ragResponse, scenario, image]) {
  const entry = {
    user_query: userQuery,
    rag_response: ragResponse,
    scenario: scenario,
    image: image,
  }
  return entry
}

/**
 * Insert the RAGResponses entry to the HANA DB.
 * @param {RAGResponses} ragEntry - The database entry object to be inserted into the HANA DB.
 * @returns {string} - The success message.
 */
export async function insertRAGEntry(ragEntry) {
  try {
    await INSERT.into(RAGResponses).entries(ragEntry)
    return `RAG Response inserted successfully to table.`
  } catch (error) {
    console.log(`Error while storing the RAG response to HANA db: ${error.toString()}`)
    throw error
  }
}

/**
 * Delete all RAG entries from the RAGResponses table in the HANA DB.
 * @param {string} scenario - The demo scenario flag.
 * @returns {string} - The success message.
 */
export async function deleteRAGEntries(scenario) {
  try {
    switch (scenario) {
      case s_text:
        await DELETE.from(RAGResponses).where(RAGResponses.scenario == s_text)
        break
      case s_image:
        await DELETE.from(RAGResponses).where(RAGResponses.scenario == s_image)
        break
      case s_test:
        await DELETE.from(RAGResponses).where(RAGResponses.scenario == s_test)
        break
      case s_backup:
        // We do not touch the backup
        break
      default:
        break
    }
    return 'Successfully deleted RAG entries!'
  } catch (error) {
    console.log(`Error while deleting RAG entries in db: ${error.toString()}`)
  }
}

/**
 * For testing only - insert dummy record into the database with file read locally
 * @param {String} user_query
 * @param {String} scenario
 * @returns {null} - .
 */
export async function testInsert(user_query, scenario) {
  const importData = fs.readFileSync(path.resolve(`${imageFilePath}`))

  let entry = {
    user_query: user_query,
    rag_response: 'This is my totally made up response that is only good for testing',
    scenario: scenario,
    image: importData,
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  await sleep(5000)

  await INSERT.into(RAGResponses).entries(entry)
}
