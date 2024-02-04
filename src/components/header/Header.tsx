import { FC } from "react"
import SocialList from "./SocialList"
import Logo from "./Logo"
import Burger from "./Burger"
import Nav from "./Nav"
import ModeSwitcher from "../mode-switcher/ModeSwitcher"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import UserAccountNav from "./UserAccountNav"
import SignUnBtn from "./SignUpBtn"

const Header: FC = async () => {

	const session = await getServerSession(authOptions)

	return (
		<header
			id="header"
			className="header"
		>
			<div className="container">
				<div className="flex items-center h-12">
					<Logo />
					<Nav />
					{!session?.user && <SignUnBtn />}
					<ModeSwitcher />
					<SocialList />
					{session?.user && <UserAccountNav />}
					<Burger />
				</div>
			</div>
		</header>
	)
}

export default Header