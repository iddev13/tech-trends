'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"

// Home Page Loader
const Loader = () => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: 0 }}
				exit={{ opacity: 1 }}
				className='home-loader'>
				<div className='home-loader__wrapper'>
					<div className='home-loader__box-wrapper'>
						<div><span></span></div>
						<div><span></span></div>
						<div><span></span></div>
						<div><span></span></div>
					</div>
					<p>loading...</p>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

const Loading = () => {

	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const timer = 100
		const body = document.querySelector('body')

		setTimeout(() => {
			setIsLoading(true)
			body?.classList.remove('lock')
		}, timer);

	}, [isLoading])

	return (
		<>{!isLoading && <Loader />}</>
	)
}

export default Loading

