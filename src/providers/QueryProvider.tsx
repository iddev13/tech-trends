'use client'

import React, { FC } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

interface IProvider {
	children: React.ReactNode
}

// Create a client
const queryClient = new QueryClient()

const QueryProvider: FC<IProvider> = ({ children }) => {

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}

export default QueryProvider