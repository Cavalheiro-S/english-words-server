import axios from "axios"
import "dotenv/config";

const postTranslateWords = async (query: string | Array<string>, to: "pt" | "en") => {
    const url = 'https://microsoft-translator-text.p.rapidapi.com/translate';
    const params = {
        to,
        'api-version': '3.0',
        'profanityAction': 'NoAction',
        "textType": 'plain',
    }
    const headers = {
        "content-type": "application/json",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPID_API_KEY || ""
    }
    const data = mountDataToTranslate(query);
    const response = await axios.post<TranslateServiceResponse>(url, data, { headers, params });
    const translations = response.data.map(response => {
        return response.translations[0].text;
    })
    return translations;

}

const mountDataToTranslate = (query: string | Array<string>): string | Array<{ Text: string }> => {
    if (typeof query === "string") {
        const queryFormated = query.toLowerCase();
        return [{ Text: queryFormated }]
    }
    return query.map(word => {
        const wordFormated = word.toLowerCase();
        return { Text: wordFormated }
    })
}

export { postTranslateWords }