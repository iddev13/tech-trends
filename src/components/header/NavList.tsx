'use client'

import { useEffect } from "react"
import { menuItems } from './links'
import MenuItems from './MenuItems'

const NavList = () => {

	function fixedMenu() {
		const header = document.querySelector('#header')
		const body = document.querySelector('body')

		window.onload = () => {
			if (window.pageYOffset > 50 && !body?.classList.contains('lock')) header?.classList.add("header__fixed")
		}

		// Pins a header to the top of the screen on scroll
		window.onscroll = function showHeader() {
			if (window.pageYOffset > 50 && !body?.classList.contains('lock')) {
				header?.classList.add("header__fixed");
			} else {
				header?.classList.remove("header__fixed");
			}
		};
	}

	useEffect(() => {
		fixedMenu()
	}, [])

	return (
		<div
			className="w-full md:px-2 lg:flex lg:items-center lg:w-min lg:px-0 ">
			<ul className='block lg:flex'>
				{menuItems.map((menu) => {
					const depthLevel = 0 // Menu depth level
					return <MenuItems items={menu} depthLevel={depthLevel} key={menu.id} />
				})}
			</ul>
		</div>
	)
}

export default NavList