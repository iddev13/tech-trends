"use client";


import { FC, ReactNode, createContext, useEffect, useState } from "react";

interface IThemeContext {
	mode: string | undefined | null | 'dark' | 'light';
	toggle?: (value: string) => void;
}

const defaultState = {
	mode: 'light'
};

export const ThemeContext = createContext<IThemeContext>(defaultState);

interface IThemeProvider {
	children: ReactNode
}

export const ThemeContextProvider: FC<IThemeProvider> = ({ children }) => {

	const [mode, setMode] = useState('light');

	useEffect(() => {
		const localStorageValue = localStorage?.getItem('ttTheme')
		const body = document.querySelector('body')

		// Adding a mask class to darken when opening the hamburger menu. With a delay so that it does not work when the page loads.
		setTimeout(() => {
			body?.querySelector('main')?.classList.add('mask')
		}, 100);

		if (localStorageValue !== null) {
			setMode(localStorageValue)
			body?.setAttribute('data-theme', localStorageValue)
		}
		if (localStorageValue === null || localStorageValue === undefined) {
			setMode(defaultState.mode)
			localStorage.setItem('ttTheme', defaultState.mode)
			body?.setAttribute('data-theme', defaultState.mode)
		}
	}, [mode])


	const toggle = (value: string) => {
		const body = document.querySelector('body')
		body?.setAttribute('data-theme', value)
		mode === 'dark'
			? localStorage.setItem('ttTheme', 'light')
			: localStorage.setItem('ttTheme', 'dark')
	};

	return (
		<ThemeContext.Provider value={{ mode, toggle }}>
			{children}
		</ThemeContext.Provider>
	)
};