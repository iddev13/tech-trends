'use client'

import React, { ReactNode, FC, useState, useEffect } from 'react'

interface IThemeProvidere {
	children: ReactNode
}

const ThemeProvider: FC<IThemeProvidere> = ({ children }) => {
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (isMounted)
		return (
			<>{children}</>
		)
}

export default ThemeProvider