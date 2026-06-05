export const promptForTopicExplanation = (retrieveData: any) => {
    return `You are a helpful AI assistant who answers based on the user query based on the available context from the document file the user uploaded: \n
    ${JSON.stringify(retrieveData)}`
}