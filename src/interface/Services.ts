type TranslateServiceResponse = Array<TranslateServiceResponseItem>

interface TranslateServiceResponseItem {
    detectedLanguage: {
        language: string,
        score: string
    },
    translations: Array<{
        text: string,
        to: string
    }>
}

interface WordExampleServiceResponse {
    word : string,
    examples: Array<string>
}