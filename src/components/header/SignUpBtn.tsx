import Link from 'next/link'

const SignUpBtn = () => {
	return (
		<Link href={'/sign-up'} className='inline-flex items-center max-w-fit bg-header-link-hover-text-color text-white py-1 px-3 capitalize rounded-lg mx-2 whitespace-nowrap flex-nowrap'>Sign-Up</Link>
	)
}

export default SignUpBtn