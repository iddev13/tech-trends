'use client'

import { useRef } from 'react'
import * as yup from 'yup'
import { Field, FormikProvider, useFormik } from 'formik'
import { RiUser3Line } from "react-icons/ri"
import styles from './Form.module.scss'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { blur, focus } from '@/utils/formActions'

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.required('Email is required')
		.email('Enter a valid email'),
	password: yup
		.string()
		.required()
		.min(8, "Password must contain at least 8 characters"),
})

const LoginForm = () => {
	const router = useRouter()
	const ref = useRef<HTMLFormElement | null>(null)

	const loginHandler = async (values: { email: string, password: string }, actions: any) => {

		const data = {
			email: values.email,
			password: values.password,
			redirect: false
		}

		try {
			// const signInData = await signIn('google')

			const signInData = await signIn('credentials', data)

			if (!signInData?.ok) {
				console.log(signInData?.error)
				actions.resetForm();
				toast.error('Invalid email or password')
			} else {
				toast.success('Welcome')
				setTimeout(() => {
					router.push('/profile')
					router.refresh()
				}, 2000)
			}
			console.log(signInData);

		} catch (error) {
			console.log(error);
			toast.error('Something went wrong...(((((((((((((')
		}
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			loginHandler(values, actions)
		},
	});

	return (
		<FormikProvider value={formik}>
			<form ref={ref} onSubmit={formik.handleSubmit} className={styles.form}>
				<div className={styles.form__item}>
					<div className={`${styles.inputWrapper}`}
						onFocus={(e) => focus(e, styles.active)}
						onBlur={(e) => blur(e, formik.values.email, styles.active)}
					>
						<span className={styles.inputWrapper__icon}>@</span>
						<label htmlFor='email'>email</label>
						<Field
							style={formik.touched.email && formik.errors.email ? { borderColor: 'red' } : {}}
							id="email"
							name="email"
							type="email"
							onChange={formik.handleChange}
							value={formik.values.email}
							error={formik.touched.email && Boolean(formik.errors.email).toString()}
							helpertext={formik.touched.email && formik.errors.email}
						/>
						{formik.touched.email && formik.errors.email && <p className={styles.inputWrapper__text}>
							<span>{formik.errors.email}</span>
						</p>}
					</div>
				</div>
				<div className={styles.form__item}>
					<div
						className={`${styles.inputWrapper}`}
						onFocus={(e) => focus(e, styles.active)}
						onBlur={(e) => blur(e, formik.values.password, styles.active)}
					>
						<span className={styles.inputWrapper__icon}>
							<RiUser3Line />
						</span>
						<label htmlFor='password'>password</label>
						<Field
							style={formik.touched.password && formik.errors.password ? { borderColor: 'red' } : {}}
							id="password"
							name="password"
							type="password"
							onChange={formik.handleChange}
							value={formik.values.password}
							error={formik.touched.password && Boolean(formik.errors.password).toString()}
							helpertext={formik.touched.password && formik.errors.password}
						/>
						{formik.touched.password && formik.errors.password && <p className={styles.inputWrapper__text}>
							<span>{formik.errors.password}</span>
						</p>}
					</div>
				</div>
				<div className={styles.form__actions}>
					<button type="submit" className={styles.form__btn}>sign-in</button>
					<Link href={'./sign-up'} className='text-cyan-400'>Sign Up</Link>
				</div>
			</form>
			<ToastContainer position='top-center' hideProgressBar={true} theme={'dark'} autoClose={3000} />
		</FormikProvider>
	)
}

export default LoginForm