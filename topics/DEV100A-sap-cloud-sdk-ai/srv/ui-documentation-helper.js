import * as Utils from './utils.js'

// API implementation
// Not sure if I like the Utils.function() approach
export default function () {
  /**
   * OData function handler for executing a RAG request to the given chat model.
   * The deployed chat model can be looked up in the SAP AI Core instance. It can be exchanged based on the model deployments.
   * The user query is currently hard-coded.
   * @param {*} req - The request parameters.
   * @return {string} - The RAG response from the chat model.
   */
  this.on('getRagResponse', async (req) => {
    if (
      typeof req.data === 'undefined' ||
      typeof req.data.user_query === 'undefined' ||
      typeof req.data.user_query === 'undefined'
    ) {
      throw new Error('Required input parameters not supplied')
    }

    function isEmpty(input) {
      return input.trim() === ''
    }

    if (isEmpty(req.data.user_query) || isEmpty(req.data.user_query)) {
      throw new Error('Required input parameters not supplied')
    }

    if (req.data.scenario === 's_test') {
      await Utils.testInsert(req.data.user_query, req.data.scenario)
      return `Successfully Processed Request`
    }

    if (req.data.scenario === 's_text') {
      let entry = await Utils.createRAGEntry(await Utils.executeRAG(req.data.user_query, req.data.scenario))
      await Utils.insertRAGEntry(entry, req.data.scenario)
    }

    if (req.data.scenario === 's_image' || req.data.scenario === 's_backup') {
      let entry = await Utils.createRAGEntry(await Utils.executeRagWithImage(req.data.user_query, req.data.scenario))
      await Utils.insertRAGEntry(entry, req.data.scenario)
    }

    return `Successfully Processed Request`
  })

  /**
   * OData function handler for deleting RAG response entries from the HANA db.
   * @param {*} req - The request parameters.
   * @return {string} - Success message for deleting the RAG response entries.
   */
  this.on('deleteRAGEntries', async (req) => {
    return await Utils.deleteRAGEntries(req.data.scenario)
  })
}
