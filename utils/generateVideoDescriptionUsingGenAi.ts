import {GoogleGenerativeAI} from "@google/generative-ai";
import {configDotenv} from "dotenv";

configDotenv();

// Access your API key as an environment variable (see "Set up your API key" above)

const api_key = process.env.GOOGLE_AI_STUDIO_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(api_key!);

export async function generateVideoDescriptionUsingGenAi({prompt}:{prompt:string}){
	try {
		const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

		const initialPrompt = `"Generate a video description for a YouTube video based on its transcript and if the video is technical(Coding,software dev etc) then generate the full code examples, and if the video is about interview generate huge detailed content on it with questions and answers.\n and Explain that thing in complete details from your side also in easy way.  \nHERE IS THE YOUTUBE VIDEO URL:: \n\n" ${prompt} `;

		const result = await model.generateContent(initialPrompt);
		const response = result.response;
		const text = response.text();
		console.log(text);

		return text;

	} catch (error:any){
		console.log(error);
		if (error.name === "GoogleGenerativeAI Error"){
			throw new Error(error.message);
		}
		throw new Error(error.message);
	}

}

