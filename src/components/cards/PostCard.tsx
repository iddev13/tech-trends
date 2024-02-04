import React, { FC } from 'react'
import Link from 'next/link'
import { Tag } from '@prisma/client'
import styles from './Cards.module.scss'
import TagUI from '../tag/TagUI'

interface IPostcard {
	title: string
	text: string
	url: string
	imageUrl: string
	label: string
	tag: Tag
}

const PostCard: FC<IPostcard> = ({ title, text, label, url, tag, imageUrl }) => {
	return (
		<article className={styles.postCard}>
			<h3>{title}</h3>
			<p>{text}</p>
			<img src={imageUrl} alt={title} />
			<div className='flex justify-between items-center'>
				<TagUI label={tag.name} />
				<Link href={url}>{label}</Link>
			</div>
		</article>
	)
}

export default PostCard