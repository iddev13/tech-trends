import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const post = await db.post.create({
			data: {
				title: body.title,
				content: body.content,
				tagId: body.tagId,
				image: body.image,
				userId: body.userId
			}
		})

		return NextResponse.json(post, { status: 201 })
	} catch (error) {
		return NextResponse.json({ message: 'could not create post' }, { status: 500 })
	}
}