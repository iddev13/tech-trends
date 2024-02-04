'use client'

import { INavItem } from '@/types/header'
import { signOut } from 'next-auth/react'
import MenuItems from './MenuItems'

const menuItems: Array<INavItem> = [
	{
		id: 1, path: '/profile',
		name: 'userName',
		subMenu: [
			{
				id: 1, path: '/profile',
				name: 'profile',
			},
			{
				id: 2, path: '/create',
				name: 'add post',
			},
			{
				id: 3, path: '/sign-in',
				name: 'sign-out',
			},
		]
	},
]

const UserAccountNav = () => {
	return (
		<>
			<ul className='block lg:flex relative'>
				{menuItems.map((menu) => {
					const depthLevel = 0 // Menu depth level
					return <MenuItems items={menu} depthLevel={depthLevel} key={menu.id} />
				})}
			</ul>
			{/* <button type='button' className='header__link'
				onClick={() => signOut({
					redirect: true,
					callbackUrl: `/sign-in`
				})}
			>sign-out</button> */}
		</>
	)
}

export default UserAccountNav