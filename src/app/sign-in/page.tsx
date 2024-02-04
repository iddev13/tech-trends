import LoginForm from '@/components/forms/LoginForm'
import React from 'react'

const SignIn = () => {
	return (
		<div>
			<div className='container'>
				<h1 className='text-center mb-5'>SignIn</h1>
				<LoginForm />
			</div>
		</div>
	)
}

export default SignIn