'use client'

import { FC } from 'react'
import styles from './Back.module.scss'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { useRouter } from 'next/navigation'

interface IBack {
	label?: string
}

const Back: FC<IBack> = ({ label }) => {
	const router = useRouter()
	return (
		<button
			className={styles.back}
			onClick={() => router.back()}
			title="return back"
		>
			<RiArrowGoBackFill />
			{label ? label : 'back'}
		</button>
	)
}

export default Back