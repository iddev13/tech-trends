'use client'

import { FC, useRef } from 'react'
import * as yup from 'yup'
import { Field, FormikProvider, useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { RiLockPasswordLine, RiLockPasswordFill, RiUser3Line } from "react-icons/ri"
import styles from './Form.module.scss'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { blur, focus } from '@/utils/formActions'

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
		.min(8, "Password must contain at least 8 characters"),
	confirmPassword: yup
		.string()
		.required()
		.min(8, "Password must contain at least 8 characters")
		.test('passwords-match', 'Passwords must match',
			function (value) { return this.parent.password === value })
})

const RegisterForm = () => {
	const router = useRouter()
	const ref = useRef<HTMLFormElement | null>(null)

	const registerHandler = async (values: { username: string, email: string, password: string }, actions: any) => {
		alert(JSON.stringify(values, null, 2))

		const payload = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: values.username,
				email: values.email,
				password: values.password
			})
		}

		try {
			const response = await fetch('/api/user', payload)
			console.log(response);

			if (response.ok) {
				toast.success('User was created)')
				setTimeout(() => {
					router.push('/sign-in')
				}, 2000)
			} else {
				console.error('Registration faled')
				toast.error('Registration faled')
				actions.resetForm();
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong...(((((((((((((')
		}
	}

	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			registerHandler(values, actions)
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
						<span className={styles.inputWrapper__icon}>
							@
						</span>
						<label htmlFor="email">email</label>
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
						onFocus={(e) => focus(e,styles.active)}
						onBlur={(e) => blur(e, formik.values.username,styles.active)}
					>
						<span className={styles.inputWrapper__icon}>
							<RiUser3Line />
						</span>
						<label htmlFor="username">username</label>
						<Field
							style={formik.touched.username && formik.errors.username ? { borderColor: 'red' } : {}}
							id="username"
							name="username"
							type="text"
							onChange={formik.handleChange}
							value={formik.values.username}
							error={formik.touched.username && Boolean(formik.errors.username).toString()}
							helpertext={formik.touched.username && formik.errors.username}
						/>
						{formik.touched.username && formik.errors.username && <p className={styles.inputWrapper__text}>
							<span>{formik.errors.username}</span>
						</p>}
					</div>
				</div>
				<div className={styles.form__item}>
					<div
						className={`${styles.inputWrapper}`}
						onFocus={(e) => focus(e,styles.active)}
						onBlur={(e) => blur(e, formik.values.password,styles.active)}
					>
						<span className={styles.inputWrapper__icon}>
							<RiLockPasswordLine />
						</span>
						<label htmlFor="password">password</label>
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
				<div className={styles.form__item}>
					<div
						className={`${styles.inputWrapper}`}
						onFocus={(e) => focus(e,styles.active)}
						onBlur={(e) => blur(e, formik.values.confirmPassword,styles.active)}
					>
						<span className={styles.inputWrapper__icon}>
							<RiLockPasswordFill />
						</span>
						<label htmlFor="confirmPassword">Confirm Password</label>
						<Field
							style={formik.touched.confirmPassword && formik.errors.confirmPassword ? { borderColor: 'red' } : {}}
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							onChange={formik.handleChange}
							value={formik.values.confirmPassword}
							error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword).toString()}
							helpertext={formik.touched.confirmPassword && formik.errors.confirmPassword}
						/>
						{formik.touched.confirmPassword && formik.errors.confirmPassword && <p className={styles.inputWrapper__text}>
							<span>{formik.errors.confirmPassword}</span>
						</p>}
					</div>
				</div>

				<div className={styles.form__actions}>
					<button type="submit" className={styles.form__btn}>sign-up</button>
					<Link href={'./sign-in'} className='text-cyan-400'>Sign In</Link>
				</div>
			</form>
			<ToastContainer position='top-center' hideProgressBar={true} theme={'dark'} autoClose={3000} />
		</FormikProvider>
	)
}

export default RegisterForm