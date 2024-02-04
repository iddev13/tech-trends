import { FC } from 'react'
import styles from './Tag.module.scss'

interface ITagUI {
	label: string
	cn?: string
}

const TagUI: FC<ITagUI> = ({ label, cn }) => {
	return (
		<span className={`${styles.tag} ${cn}`}>{label}</span>
	)
}

export default TagUI