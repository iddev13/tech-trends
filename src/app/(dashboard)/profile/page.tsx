import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'

const Profile = async () => {
	const session = await getServerSession(authOptions)
	console.log('Profile page session', session);

	if (session?.user) {
		return (
			<div>
				<div className="container">
					<h2 className='text-2xl'>Welcome to admin {session?.user.username}</h2>
				</div>
			</div>
		)
	}

	return (
		<div>
			<div className='container'>
				<h2 className='text-2xl mb-2'>Please login to see this admin page</h2>
			</div>
			<Link href={'/sign-in'} className='btn'>sign in</Link>
		</div>
	)
}

export default Profile