'use client'

import { pulseBtnFunc } from "@/utils/pulseBtnFunc"
import Link from "next/link"
import { FC } from "react"
import { signOut } from "next-auth/react"
import { useWindowSize } from "@/hooks/useWindowSize"
import { closeMenu } from "@/utils/closeMenuFunc"
import { usePathname } from "next/navigation"
import { ISubMenuLink } from "@/types/header"
import { RiAlignJustify } from "react-icons/ri";

const SubMenuLink: FC<ISubMenuLink> = ({ path, name, children }) => {

	const pathName = usePathname()
	const sizeHook = useWindowSize()
	const size = 1024

	return (
		<div className={`submenu-link-wrapper ${pathName === path ? 'active' : ''}`}>

			{name === 'sign-out'
				? <button type='button' className="submenu-link pulse-btn"
					onClick={(e) => {
						signOut({
							redirect: true,
							callbackUrl: `/sign-in`
						})
						pulseBtnFunc(e)
						closeMenu(sizeHook, size, e)
					}}
				>sign-out</button>
				: <Link href={path}
					className={`submenu-link pulse-btn ${!children ? 'full-w-link' : ''} `}
					onClick={(e) => { pulseBtnFunc(e); closeMenu(sizeHook, size, e) }}
				>

					{ /*//?  Submenu Icon*/}
					{name === 'second level 1' && <span className='submenu-link__icon'><RiAlignJustify /></span>}

					<span className='submenu-link__name flex-grow-1 flex-shrink-1'>{name}</span>
				</Link>}
			{children}
		</div>
	)
}

export default SubMenuLink