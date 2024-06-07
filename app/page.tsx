"use client";

import React, {useState} from "react";
import InputBox from "@/components/InputBox";
import Logo from "@/components/Logo";
import Image from "next/image";
import {formatResponse} from "@/utils/formatResponse";
import {BeatLoader} from "react-spinners";


export default function Home() {

	const apiKey = process.env.apiKey;

	const [transcript, setTranscript] = useState<{
		success: boolean,
		title: string,
		thumbnail: string,
		descriptionUsingGenAI: string
	} | null>(null);
	const [videoUrl, setVideoUrl] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);


	async function handleDescribe(yt_url: string) {
		try {
			setLoading(true);
			const apiResponse = await fetch(`/api?yt-url=${yt_url}&api-key=${apiKey}`, {
				method: "GET",
				cache: "no-cache",
			});
			const result = await apiResponse.json();
			if (!result.success) {
				setLoading(false);
				setError(result.message);
			} else {
				console.log(result);
				console.log(result.res);
				setTranscript(result);
				setLoading(false);
				setError(null);
			}
		} catch (error: any) {
			setLoading(false);
			setError(error.message);
			console.log(error);
		}
	}


	return (
		<div className={"max-w-8xl mx-auto"}>
			<div className="flex flex-col justify-between items-start gap-20">

				<div className="flex justify-start items-center w-full bg-violet-900 p-6">
					<Logo width="w-32" height="w-32"/>
				</div>

				<div className={"mx-auto w-full md:w-[60%]"}>
					<h1 className="font-black text-gray-600 p-4">
						You Don&apos;t have to watch the whole video to get the gist of it.
						Just paste the YouTube video url and get the summary of the video.
					</h1>
					<div className={"font-bold text-gray-700 bg-amber-100 p-4 mt-4"}>
						<span className={"text-amber-600 text-3xl"}>&#8505;nfo:&nbsp;</span>
						<ol className={"text-sm"}>
							<li className={"pt-4"}>You can not paste the youtube video url whose transcript is not available or disabled by the owner.
								if you paste the url of such video then you will get the error message.
							</li>
							<li className={"pt-4"}>
								You can not paste the YouTube video url whose transcript is not in English.
							</li>
						</ol>
					</div>
				</div>

				<div className="mx-auto w-full md:w-[70%]">
					<InputBox
						handleDescribe={handleDescribe}
						placeholder="enter youtube video url here..."
						videoUrl={videoUrl}
						setVideoUrl={setVideoUrl}
						loading={loading}
					/>
				</div>
				{
					loading
						?
						<div
							className="flex flex-col justify-center items-start gap-4 mx-auto text-violet-700 font-black text-2xl">
							<BeatLoader color="#5B21B6" size={25}/>
						</div>
						:
						(
							error
								?
								<div
									className="flex flex-col justify-center items-start gap-4 mx-auto text-violet-700 font-black text-2xl">
									{error}
								</div>
								:
								<>
									{
										transcript?.thumbnail && transcript.title &&
                                      <div className="flex flex-col justify-center items-center">
                                          <div className="w-full md:w-1/2 overflow-hidden rounded-xl">
                                              <Image
                                                src={transcript?.thumbnail}
                                                alt={transcript?.thumbnail}
                                                className="w-full object-cover"
                                                width={100}
                                                height={100}
                                                objectFit={"cover"}
                                                quality={100}
                                                unoptimized={true}
                                              />
                                          </div>
                                          <h1
                                            className="w-full md:w-[50%] text-5xl font-black text-violet-700 flex justify-start mt-5 pl-5">
											  {transcript.title}
                                          </h1>
                                      </div>
									}
									<div
										className="max-w-6xl px-10 bg-exp_bg py-10 rounded-xl mx-auto">

										{
											transcript && transcript.descriptionUsingGenAI
												?
												<div className="text-gray-600 font-medium"
												     dangerouslySetInnerHTML={{__html: formatResponse(transcript.descriptionUsingGenAI)}}>
													{/*{*/}
													{/*	formatResponse(transcript.descriptionUsingGenAI)*/}
													{/*}*/}
												</div>
												:
												(
													videoUrl === "" ?
														<div className="text-violet-700 font-black text-5xl">
															Please enter a youtube video url
														</div>
														:
														<div className="text-violet-700 font-black text-5xl">
															Couldn&apos;t find any data <br/>
															Please enter a youtube video url
														</div>
												)
										}

										{
											transcript && transcript?.thumbnail && transcript?.title
											&&
                                          <div className={"text-violet-700 font-black text-2xl pt-14"}>
                                              Watch the Complete Video here&nbsp;&nbsp;&nbsp; <br/> <br/>
                                              {/*<Link href={videoUrl}*/}
                                              {/*      className={"underline decoration-black py-10 text-xl font-semibold"}>*/}
                                              {/*    [ {videoUrl} ]*/}
                                              {/*</Link>*/}
	                                          <iframe
	                                            src={`https://www.youtube.com/embed/${videoUrl.split('v=')[1] || videoUrl.split('youtu.be/')[1]}`}
	                                            width="100%"
	                                            height="500px"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
	                                            className={"rounded-xl"}
	                                          />
                                          </div>
										}
									</div>
								</>
						)
				}
			</div>
		</div>
	);
}
