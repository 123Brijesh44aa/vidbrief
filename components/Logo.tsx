import React from 'react';
import Image from "next/image";

interface LogoProps{
	width?: string;
	height?: string;
}

const Logo = ({width="w-24",height="w-24"}: LogoProps) => {
	return (
		<div className={`${width} ${height} overflow-hidden`}>
			<Image
				src="/icons/VidBrief-logo.svg"
				alt="logo"
				width={100}
				height={100}
				className="w-full"
			/>
		</div>
	);
};

export default Logo;
