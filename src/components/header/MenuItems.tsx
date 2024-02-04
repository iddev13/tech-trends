'use client'
import React, { useState, useEffect, useRef, FC } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'
import { INavItem } from '@/types/header'
import Dropdown from './Dropdown'
import HeaderLink from './HeaderLink'
import SubMenuLink from './SubMenuLink'
import DropdownArrow from './DropdownArrow'
import DropdownBtn from './DropdownBtn'

interface INavBar {
	items: INavItem
	depthLevel: number
}

const MenuItems: FC<INavBar> = ({ items, depthLevel }) => {

	const size = useWindowSize()
	const [dropdown, setDropdown] = useState<boolean>(false)
	let ref = useRef<HTMLLIElement | null>(null)

	useEffect(() => {

		const handler = (event: Event): void => {
			const clickedElement = event.target as HTMLElement
			event.stopPropagation()

			if (!dropdown && ref.current && ref.current.contains(clickedElement)) {
				setDropdown(true)
			}
			if (dropdown && ref.current && !ref.current.contains(clickedElement)) {
				setDropdown(false)
			}
		}

		document.addEventListener('click', handler)

		return () => document.removeEventListener('click', handler)

	}, [dropdown])

	const onMouseEnter = () => size.width >= 1024 && setDropdown(true)

	const onMouseLeave = () => size.width >= 1024 && setDropdown(false)


	return (
		<li
			className='menu-items'
			ref={ref}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={(e) => {
				e.stopPropagation()
				if (dropdown) setDropdown(false)
			}}
		>
			{
				// If there is a submenu
				items.subMenu ? (
					// If the first depth level then HeaderLink
					depthLevel === 0
						? (
							// If the screen width is more than 1024 (desktop version), then HeaderLink.
							size.width >= 1024
								? < HeaderLink path={items.path} name={items.name} isActive={dropdown}>
									<>
										{ // If the second or more depth level, then DropdownArrow
											depthLevel > 0 && <DropdownArrow dropdownStatus={dropdown} />
										}
										<Dropdown depthLevel={depthLevel} submens={items.subMenu} dropdown={dropdown} position={items.position} />
									</>
								</HeaderLink>

								// If the screen width is up to 1024 (mobile version) then DropdownBtn.
								//  Button without link to open or close dropdown

								: < DropdownBtn path={items.path} name={items.name} dropdownStatus={dropdown}>
									<>
										<DropdownArrow dropdownStatus={dropdown} />
										<Dropdown depthLevel={depthLevel} submens={items.subMenu} dropdown={dropdown} position={items.position} />
									</>
								</DropdownBtn>
						)
						// If the second or more depth level, then SubMenuLink
						: (
							// If the screen width is more than 1024 (desktop version), then SubMenuLink.
							size.width >= 1024
								? <SubMenuLink path={items.path} name={items.name}>
									<>
										<DropdownArrow dropdownStatus={dropdown} />
										<Dropdown depthLevel={depthLevel} submens={items.subMenu} dropdown={dropdown} position={items.position} />
									</>
								</SubMenuLink>

								// If the screen width is up to 1024 (mobile version) then DropdownBtn.
								//  Button without link to open or close dropdown

								: < DropdownBtn path={items.path} name={items.name} dropdownStatus={dropdown}>
									<>
										<DropdownArrow dropdownStatus={dropdown} />
										<Dropdown depthLevel={depthLevel} submens={items.subMenu} dropdown={dropdown} position={items.position} />
									</>
								</DropdownBtn>
						)

				)
					// If there is no submenu
					: (
						depthLevel === 0
							// If the first depth level then HeaderLink
							? <HeaderLink path={items.path} name={items.name}></HeaderLink>
							// If the second or more depth level, then SubMenuLink
							: <SubMenuLink path={items.path} name={items.name}></SubMenuLink>
					)
			}
		</li >
	)
}

export default MenuItems