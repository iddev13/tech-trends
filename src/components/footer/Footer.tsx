import Link from 'next/link'
import Logo from '../header/Logo'
import SocialList from '../header/SocialList'
import styles from './Footer.module.scss'
import { IFooterLink } from '@/types/footer'
import FooterLink from './FooterLink'


const links: Array<IFooterLink> = [
	{ id: 1, href: '/', label: 'home', blank: false, title: 'Home page' },
	{ id: 2, href: '/', label: 'blog', blank: false, title: 'Blog page' },
	{ id: 3, href: '/', label: 'about', blank: false, title: 'About page' },
	{ id: 4, href: '/', label: 'contact', blank: false, title: 'Contact page' },
]
const tags: Array<IFooterLink> = [
	{ id: 1, href: '/', label: 'style', blank: false, title: '#style' },
	{ id: 2, href: '/', label: 'fashion', blank: false, title: '#fashion' },
	{ id: 3, href: '/', label: 'coding', blank: false, title: '#coding' },
	{ id: 4, href: '/', label: 'travel', blank: false, title: '#travel' },
]
const social: Array<IFooterLink> = [
	{ id: 1, href: '/', label: 'facebook', blank: true, title: 'facebook' },
	{ id: 2, href: '/', label: 'instagram', blank: true, title: 'facebook' },
	{ id: 3, href: '/', label: 'youtube', blank: true, title: 'facebook' },
	{ id: 4, href: '/', label: 'tiktok', blank: true, title: 'facebook' },
]

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className="container grid grid-cols-1 md:grid-cols-2 gap-5">
				<div>
					<Logo />
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat est alias sequi debitis sint perspiciatis dolorem! Deserunt libero ad veniam.</p>
					<div className='h-12'>
						<SocialList />
					</div>
				</div>
				<nav>
					<ol>
						<li className='mb-2'>
							<span className={styles.groupTitle}>links</span>
						</li>
						{links.map(elem => {
							return <li key={elem.id}>
								<FooterLink blank={elem.blank} href={elem.href}
									label={elem.label} title={elem.title} />
							</li>
						})}
					</ol>
					<ol>
						<li className='mb-2'>
							<span className={styles.groupTitle}>tags</span>
						</li>
						{tags.map(elem => {
							return <li key={elem.id}>
								<FooterLink blank={elem.blank} href={elem.href}
									label={elem.label} title={elem.title} />
							</li>
						})}
					</ol>
					<ol>
						<li className='mb-2'>
							<span className={styles.groupTitle}>social</span>
						</li>
						{social.map(elem => {
							return <li key={elem.id}>
								<FooterLink blank={elem.blank} href={elem.href}
									label={elem.label} title={elem.title} />
							</li>
						})}
					</ol>
				</nav>
			</div>
		</footer>
	)
}

export default Footer