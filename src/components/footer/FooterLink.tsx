import { FC } from 'react'
import Link from 'next/link'
import styles from './Footer.module.scss'
import { IFooterLink } from '@/types/footer'

const FooterLink: FC<IFooterLink> = ({ blank, href, label, title }) => {
	if (blank) {
		return (
			<a href={href} title={title} target='_blank'
				className={styles.link}
			>{label}</a>
		)
	}
	return (
		<Link href={href} title={title}
			className={styles.link}
		>{label}</Link>
	)
}

export default FooterLink