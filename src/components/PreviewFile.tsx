'use client'

import React, { FC } from 'react';

interface IPrevFile {
	file: File
	width: number
	height: number
}

const PreviewFile: FC<IPrevFile> = ({ file, width, height }) => {

	const [preview, setPreview] = React.useState<any>(null);

	const reader = new FileReader();

	reader.readAsDataURL(file);

	function isFileImage(file: File) {
		return file && file['type'].split('/')[0] === 'image';
	}

	reader.onload = () => {

		setPreview(isFileImage(file) ? reader.result : "/assets/image/default.svg");

	};

	return (
		<div>
			<img src={preview ? preview : "/assets/image/default.svg"} alt="Preview" width={width} height={height} />
			{/* <label>{file.name}</label> */}
		</div>
	)

}

export default PreviewFile