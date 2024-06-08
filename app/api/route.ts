import {YoutubeTranscript, YoutubeTranscriptDisabledError} from "youtube-transcript";
import {NextRequest, NextResponse} from "next/server";
import {configDotenv} from "dotenv";
import {generateVideoDescriptionUsingGenAi} from "@/utils/generateVideoDescriptionUsingGenAi";


configDotenv()

export async function GET(request: NextRequest) {


	const youtube_data_api_key = process.env.YOUTUBE_DATA_API_KEY;
	let youtube_data_api_url_string:any = "https://www.googleapis.com/youtube/v3/videos?id=YOUTUBE-VIDEO-ID&key=YOUTUBE-DATA-API-KEY&part=snippet,contentDetails,statistics,status";
	youtube_data_api_url_string = youtube_data_api_url_string.replace("YOUTUBE-DATA-API-KEY", youtube_data_api_key);

	try {

		const {searchParams} = new URL(request.url);


		const apiKey = searchParams.get("api-key");
		let encodedApiKey: string;
		if (apiKey) {
			 encodedApiKey = encodeURIComponent(apiKey);
		}

		// Define your actual API key
		let actualApiKey: string;
		actualApiKey = process.env.MY_API_KEY!;

		let actualEncodedApiKey: string;
		actualEncodedApiKey = encodeURIComponent(actualApiKey);

		// Check if the API key is valid
		if (encodedApiKey! !== actualEncodedApiKey) {
			// If the API key is not valid, return an error response
			return NextResponse.json({
				success: false,
				message: 'Invalid API key'
			});
		}


		const yt_url = searchParams.get("yt-url");
		if (typeof yt_url === "string") {

			const videoId = yt_url.split('v=')[1]?.split('&')[0] || yt_url.split('youtu.be/')[1];



			const videoDetails = await fetch(youtube_data_api_url_string.replace("YOUTUBE-VIDEO-ID",videoId), {
				method: "GET",
				cache: "no-cache",
			});

			const videoDetailsResponse = await videoDetails.json();
			if (!videoDetails.ok || !videoDetailsResponse || videoDetailsResponse.items.length === 0) {
				return NextResponse.json(
					{
						success: false,
						message: "Invalid URL"
					}
				);
			}
			const items = await videoDetailsResponse.items;
			console.log(items);
			let title: string;
			let thumbnail: string;
			if (items) {
				const snippet = await items[0].snippet;
				title = await snippet.title;
				console.log(await snippet.thumbnails);
				thumbnail = snippet.thumbnails.maxres?.url ||
					snippet.thumbnails.standard?.url ||
					snippet.thumbnails.high?.url ||
					snippet.thumbnails.medium?.url ||
					snippet.thumbnails.default?.url ||
					"https://www.gyanblog.com/static/fda2e87a08c62a203095b9d2d5cab9a5/670ae/youtube_thumbnails.jpg";

			} else {
				return NextResponse.json(
					{
						success: false,
						message: "Data not found for this video. Please try another video."
					}
				);
			}


			const res = await YoutubeTranscript.fetchTranscript(yt_url);


			const englishSentencePattern = /^[A-Za-z0-9.,'!?;:\s]+$/;

			const isEnglish = (text: string) =>  englishSentencePattern.test(text);

			let transcriptArray = [];
			let transcript: string;


			if (res) {
				if (res.length !== 0) {
					if (res.map((item: any) => isEnglish(item.text))) {
						transcriptArray = res.map((item: any) => item.text);
						transcript = transcriptArray.join(' ');
					} else {
						transcript = " This video's transcript is not in English. Please try another video.";
					}
				}else {
					transcript = "This video does not have a transcript. Please try another video.";
				}
			} else {
				transcript = "This video does not have a transcript. Please try another video.";
			}


			const descriptionUsingGenAI = await generateVideoDescriptionUsingGenAi( {prompt: transcript});

			return NextResponse.json(
				{
					success: true,
					title,
					thumbnail,
					descriptionUsingGenAI
				}
			);
		}
		return NextResponse.json(
			{
				success: false,
				message: "Invalid URL"
			}
		);
	} catch (error:any) {
		console.log(error);
		if (error instanceof YoutubeTranscriptDisabledError){
			return NextResponse.json(
				{
					success: false,
					message: "Transcript disabled for this video"
				}
			);
		} else {
			return NextResponse.json(
				{
					success: false,
					message: "Something went wrong! Please try again later",
					error: error
				}
			)
		}
	}
}
