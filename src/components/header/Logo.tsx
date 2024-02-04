import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

// Header Logo
const Logo: FC = () => {
	return (
		<div className="select-none  mr-4 lg:mr-14 flex-auto flex items-center lg:flex-none">

			<Link href={'/'} className="inline-block relative
		 w-20 h-12 whitespace-nowrap">
				<Image
					className="block w-full h-full top-0 left-0 z-10 object-contain"
					src="/assets/image/tt-logo.webp"
					fill alt="LOGO"
					sizes="(max-width: 768px) 15vw, (max-width: 1200px) 10vw, 5vw"
					priority={true}
				/>
			</Link>
		</div>
	)
}

export default Logo