import { RiFacebookFill, RiTwitterFill, RiInstagramLine, RiGoogleFill } from "react-icons/ri"

const SocialList = () => {
	return (
		<ul className="social-list">
			<li className="flex items-center h-full">
				<a href="/"
					title="Facebook"
					className="social-link bg-facebook">
					<RiFacebookFill />
				</a>
			</li>
			<li className="flex items-center h-full">
				<a href="/"
					title="Instagram"
					className="social-link social-instagram">
					<RiInstagramLine />
				</a>
			</li>
			<li className="flex items-center h-full">
				<a href="/"
					title="Twitter"
					className="social-link bg-twitter">
					<RiTwitterFill />
				</a>
			</li>
			<li className="flex items-center h-full">
				<a href="/"
					title="Google"
					className="social-link bg-google">
					<RiGoogleFill />
				</a>
			</li>
		</ul>
	)
}

export default SocialList
