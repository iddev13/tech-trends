import Back from "@/components/backBtn/Back"
import TagUI from "@/components/tag/TagUI"
import { db } from "@/lib/db"
import { FC } from "react"

interface IPostDetailPage {
	params: {
		id: string
	}
}

const getPost = async (id: string) => {
	const response = await db.post.findFirst({
		where: {
			id: id
		},
		select: {
			id: true,
			title: true,
			content: true,
			tag: true,
			image: true
		}
	})
	return response
}

const Post: FC<IPostDetailPage> = async ({ params }) => {
	const post = await getPost(params.id)
	// console.log(params.id);
	// console.log('post here ====>', post);

	return (
		<section className='py-5'>
			<div className="container py-5">
				<h1 className='capitalize text-3xl font-bold text-center mb-5'>Post</h1>
				<div className="mb-5">
					<Back />
				</div>
				<div>
					<h2 className="text-xl font-regular capitalize mb-5">{post?.title}</h2>
					<img src={post?.image} alt={post?.title} height={200} width={300}
						className="block mb-2"
					/>
					<TagUI label={post?.tag.name!} cn="mb-2" />
					<p className='text-slate-700'>{post?.content}</p>
				</div>
			</div>
		</section>
	)
}

export default Post