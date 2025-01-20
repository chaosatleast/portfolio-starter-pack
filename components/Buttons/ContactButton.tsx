"use client";
import React from "react";
import Wrapper from "../Wrapper";
import CreativeButton from "./CreativeButton";

type Props = {
	_id: string;
	platform: string;
	url: string;
};

function ContactButton({ _id, platform, url }: Props) {
	return (
		<div key={_id}>
			<Wrapper variant="nav">
				<CreativeButton
					onClick={() => {
						window.open(url);
					}}
				>
					{platform}
				</CreativeButton>
			</Wrapper>
		</div>
	);
}

export default ContactButton;
