import React, { FC } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import MenuItems from './MenuItems'
import { IDrop, ISubMenu } from '@/types/header'

const Dropdown: FC<IDrop> = ({ submens, dropdown, depthLevel, position }) => {
	// Menu depth level
	depthLevel = depthLevel + 1

	// If Menu depth level > 1 (more than the second level), add class dropdown-submenu
	const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : ''
	// Submenu position, left or right
	const dropdownPositionClass = depthLevel > 1 && position ? 'left' && 'dropdown--left' : ''

	return (
		<AnimatePresence>
			<motion.ul
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: dropdown ? 1 : 0, height: dropdown ? 'auto' : 0 }}
				transition={{
					opacity: {
						duration: 0
					},
					height: {
						duration: 0.3
					}
				}}
				aria-haspopup="menu"
				aria-expanded={dropdown ? "true" : "false"}
				aria-hidden={dropdown ? "false" : "true"}
				data-depthlevel={depthLevel}
				className={`dropdown ${dropdownClass} ${dropdown ? "show" : ''} ${dropdownPositionClass}`}>
				{
					submens.map((submens: ISubMenu) => {
						return <MenuItems items={submens} depthLevel={depthLevel} key={submens.id} />
					})
				}
			</motion.ul>
		</AnimatePresence>
	)
}

export default Dropdown