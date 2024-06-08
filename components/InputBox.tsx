import React, {Dispatch, SetStateAction} from 'react';
import * as async_hooks from "node:async_hooks";

interface InputBoxProps {
	placeholder?: string;
	handleDescribe: (yt_url:string) => Promise<any>;
	videoUrl: string;
	setVideoUrl: Dispatch<SetStateAction<string>>;
	loading?: boolean;
}

const InputBox = ({placeholder, handleDescribe, videoUrl, setVideoUrl, loading}: InputBoxProps) => {

	const [isFocused, setIsFocused] = React.useState(false);

	return (
		<div className="flex flex-col justify-between items-center gap-5">
			<div className={`flex flex-row justify-between items-center gap-5 px-4 py-2 rounded-full bg-violet-100 w-full ring-2 ${!isFocused ? "ring-violet-300" : "ring-violet-800 shadow-violet-700 drop-shadow"} `}>
				<input type="text" placeholder={placeholder}
				       className="py-3 px-3 w-full outline-0 bg-violet-100 text-violet-700" onFocus={() => setIsFocused(true)}  onBlur={() => setIsFocused(false)} onChange={event => setVideoUrl(event.target.value)}/>
			</div>
			<button className="py-3 px-5 text-white bg-violet-800 hover:bg-search_low duration-500 rounded-full w-full" disabled={loading} onClick={() => handleDescribe(videoUrl)}>
				{loading ? "Loading..." : "Describe"}
			</button>
		</div>
	);
};

export default InputBox;
