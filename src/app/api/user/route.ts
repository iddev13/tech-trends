import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt"
import * as yup from 'yup';

interface IUser {
	email: string
	username: string
	password: string
}

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(2, "Username must contain at least 2 characters"),
	email: yup
		.string()
		.required('Email is required')
		.email('Enter a valid email'),
	password: yup
		.string()
		.required()
		.min(8, "Password must contain at least 8 characters")
});

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { email, username, password } = validationSchema.cast(body)

		// check if email already exists
		const existingUserByEmail = await db.user.findUnique({ where: { email: email } })

		if (existingUserByEmail) {
			return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 })
		}

		// check if username already exists
		const existingUserByUsername = await db.user.findFirst({ where: { username: username } })

		if (existingUserByUsername) {
			return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 })
		}

		const hashpassword = await hash(password, 10)
		const newUser = await db.user.create({
			data: {
				username,
				email,
				password: hashpassword
			}
		})

		// newUserPassword = null; Hide password
		const { password: newUserPassword, ...rest } = newUser

		return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ message: "Somthing went wrong..." }, { status: 500 })
	}
}