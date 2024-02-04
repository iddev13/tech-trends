'use client'

import { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { pulseBtnFunc } from '@/utils/pulseBtnFunc'
import { IHeaderLink } from '@/types/header'
import { closeMenu } from '@/utils/closeMenuFunc'
import { useWindowSize } from '@/hooks/useWindowSize'
import { RiFontColor, RiLoginBoxLine, RiHome4Line, RiArrowDownDoubleLine, RiPhoneLine } from "react-icons/ri";

const HeaderLink: FC<IHeaderLink> = ({ path, name, isActive, children }) => {

	const pathName = usePathname()
	const sizeHook = useWindowSize()
	const size = 1024

	return (
		<div className={`header-link__wrapper ${pathName === path ? 'active' : ''}`}>
			<Link href={path}
				className={`header-link pulse-btn ${isActive ? 'active' : ''}`}
				onClick={(e) => {
					pulseBtnFunc(e)
					closeMenu(sizeHook, size, e)
				}}
			>
				{name === 'pages' && <span className='header-link__icon'><RiArrowDownDoubleLine /></span>}
				{name === 'home' && <span className='header-link__icon'><RiHome4Line /></span>}
				{name === 'about' && <span className='header-link__icon'><RiFontColor /></span>}
				{name === 'login' && <span className='header-link__icon'><RiLoginBoxLine /></span>}
				{name === 'contact us' && <span className='header-link__icon'><RiPhoneLine /></span>}
				<span>{name}</span>
			</Link>
			{children}
		</div>
	)
}

export default HeaderLink