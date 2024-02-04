'use client'

import { FC, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { RiSunFill, RiMoonFill } from "react-icons/ri"
import styles from './ModeSwitcher.module.scss'
import { useWindowSize } from '@/hooks/useWindowSize'
import { elementAnimation } from '@/utils/animation'


const ModeSwitcher: FC = () => {
	const [isOpen, setisOpen] = useState<boolean>(true)
	const colorsToggle = () => setisOpen(!isOpen)
	const [activeTheme, setActiveTheme] = useState<string | null>(null)
	const size = useWindowSize()
	const pathname = usePathname()
	const [currentPath, setCurrentpath] = useState(pathname)

	useEffect(() => {
		const body = document.querySelector('body')
		const currentTheme = localStorage.getItem('ttTheme')

		size.height <= 470 && colorsToggle()

		// Adding a mask class to darken when opening the hamburger menu. With a delay so that it does not work when the page loads.
		setTimeout(() => {
			body?.querySelector('main')?.classList.add('mask')
		}, 100);

		if (currentTheme !== null && currentTheme !== activeTheme) {
			body?.setAttribute('data-theme', currentTheme)
			setActiveTheme(currentTheme)
		}
		if (currentTheme === null || currentTheme === undefined) {
			body?.setAttribute('data-theme', 'light')
			localStorage.setItem('ttTheme', 'light')
			setActiveTheme('light')
		}

		elementAnimation()
	}, [activeTheme])

	const handleSwitcher = (): void => {
		const body = document.querySelector('body')
		const currentTheme = localStorage.getItem('ttTheme')
		if (currentTheme === 'dark') {
			body?.setAttribute('data-theme', 'light')
			localStorage.setItem('ttTheme', 'light')
			setActiveTheme('light')
		} else {
			body?.setAttribute('data-theme', 'dark')
			localStorage.setItem('ttTheme', 'dark')
			setActiveTheme('dark')
		}
	}


	return (
		<div className={`${styles.switcher}`} title={`${activeTheme === 'light' ? 'Dark' : 'Light'}`}
			onClick={() => handleSwitcher()}>
			<div className={styles.switcher__inner}>
				<div
					className={`${styles.colorsIcon} pulse-btn ${activeTheme === 'light' ? '' : styles.colorsIcon__dark}`}
				>
					{activeTheme === 'light' ? <RiMoonFill /> : <RiSunFill />}
				</div>
			</div>
		</div>
	)
}

export default ModeSwitcher