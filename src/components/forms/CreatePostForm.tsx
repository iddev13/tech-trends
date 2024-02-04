'use client'

import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import * as yup from 'yup';
import { Field, FormikProvider, useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query'
import { Post, Tag } from '@prisma/client'

import {
	ref,
	uploadBytes,
	getDownloadURL,
	listAll,
	list,
	deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "@/lib/firebase";
import { useSession } from "next-auth/react";
import { blur, focus } from '@/utils/formActions';
import { RiSubscript2, RiText } from 'react-icons/ri';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import styles from './Form.module.scss'
import FormBtn from './FormBtn';
import PreviewFile from '../PreviewFile';

const validationSchema = yup.object().shape({
	title: yup
		.string()
		.required('Title is required')
		.min(2, 'Minimum 2 symbols')
		.max(99, 'Maximum 99 symbols'),
	content: yup
		.string()
		.required('Content is required'),
	// .min(20, 'Minimum 20 symbols'),
	tagId: yup
		.string()
		.required('Tag is required'),
	image: yup
		.mixed()
		.required('Image is required'),
});

interface IPostForm {
	isEditing: boolean
	initialValue?: Post
	postId?: string
}

const CreatePostForm: FC<IPostForm> = ({ isEditing, initialValue, postId }) => {
	const session = useSession()
	// console.log(session.data?.user.userId);
	const router = useRouter()
	const formRef = useRef<HTMLFormElement | null>(null)
	const [isLoadingPost, setIsLoadingPost] = useState(false)
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [downloadURL, setDownloadURL] = useState<string | null>(null);

	useEffect(() => {
	}, [isSubmitted, file])


	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];

		// if (file && downloadURL && selectedFile !== file) {
		// 	const desertRef = ref(storage, downloadURL);
		// 	deleteObject(desertRef).then(() => {
		// 		// File deleted successfully
		// 		alert('File deleted successfully')
		// 	}).catch((error) => {
		// 		// Uh-oh, an error occurred!
		// 		console.log('Uh-oh, an error occurred!', error);
		// 	});
		// }

		// if (selectedFile) {
		// 	const imageRef = ref(storage, `images/${selectedFile.name + v4()}`);
		// 	setUploading(true);

		// 	try {
		// 		await uploadBytes(imageRef, selectedFile).then((snapshot) => {
		// 			getDownloadURL(snapshot.ref).then((url) => {
		// 				setDownloadURL(url)
		// 			});
		// 		});
		// 	} catch (error) {
		// 		console.error("Error uploading file: ", error);
		// 	} finally {
		// 		setUploading(false);
		// 	}
		// }
		setFile(selectedFile!);
	}

	const { isLoading, isError, data, error } = useQuery<Tag[]>({
		queryKey: ['tags'],
		queryFn: async () => {
			const response = await fetch('/api/tags')
			return response.json()
		},
	})

	const postHandler = async (
		values: { title: string, content: string, tagId: string, image: string }, actions: any) => {

		const method = initialValue ? 'PATCH' : 'POST'
		const path = initialValue ? `/api/posts/${postId}` : '/api/posts/create'

		try {
			if (file) {
				const imageRef = ref(storage, `images/${file.name + v4()}`);
				setUploading(true);

				await uploadBytes(imageRef, file).then((snapshot) => {
					getDownloadURL(snapshot.ref).then(async (url) => {
						const payload = {
							method: method,
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								title: values.title,
								content: values.content,
								tagId: values.tagId,
								image: url,
								userId: session.data?.user.userId
							})
						}
						try {
							const response = await fetch(path, payload)
							setIsLoadingPost(true)
							if (response.ok) {
								initialValue ? toast.success('Post was update)') : toast.success('Post was created)')
								setIsLoadingPost(true)
								setIsSubmitted(true)
								setTimeout(() => {
									router.push('/')
									router.refresh()
								}, 2000)
							} else {
								console.error('Faled')
								toast.error('Faled ')
								setIsLoadingPost(false)
								actions.resetForm();
							}
						} catch (error) {
							console.log(error);
							setIsLoadingPost(false)
							toast.error('Something went wrong...(((((((((((((')
						}
					})
				});
			}
		} catch (error) {
			console.error("Error uploading file: ", error);
		}

	}

	const formik = useFormik({
		// enableReinitialize: true,
		initialValues: {
			title: initialValue?.title || '',
			content: initialValue?.content || '',
			tagId: initialValue?.tagId || '',
			image: initialValue?.image || ''
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			console.log(values);
			alert(JSON.stringify(values, null, 2));
			postHandler(values = { ...values, image: downloadURL! }, actions)
		},
	});

	return (
		<FormikProvider value={formik}>
			<form ref={formRef} onSubmit={formik.handleSubmit} className={styles.form}>
				<div className={styles.form__item}>
					<div className={`${styles.inputWrapper}`}
						onFocus={(e) => focus(e, styles.active)}
						onBlur={(e) => blur(e, formik.values.title, styles.active)}
					>
						<span className={styles.inputWrapper__icon}>
							<RiText />
						</span>
						<label htmlFor='title'>title</label>
						<Field
							style={formik.touched.title && formik.errors.title ? { borderColor: 'red' } : {}}
							id="title"
							name="title"
							type="text"
							onChange={formik.handleChange}
							value={formik.values.title}
							error={formik.touched.title && Boolean(formik.errors.title).toString()}
							helpertext={formik.touched.title && formik.errors.title}
						/>
					</div>
					{formik.touched.title && formik.errors.title && <p className={styles.inputWrapper__text}>
						<span>{formik.errors.title}</span>
					</p>}
				</div>
				<div className={`${styles.form__item}`}>
					<div className={`${styles.inputWrapper} ${styles.textarea}`}
						onFocus={(e) => focus(e, styles.active)}
						onBlur={(e) => blur(e, formik.values.content, styles.active)}
					>
						<span className={styles.inputWrapper__icon}>
							<RiSubscript2 />
						</span>
						<label htmlFor='content'>Some text...</label>
						<Field
							style={formik.touched.content && formik.errors.content ? { borderColor: 'red' } : {}}
							component="textarea"
							rows="4"
							id="content"
							name="content"
							onChange={formik.handleChange}
							value={formik.values.content}
							error={formik.touched.content && Boolean(formik.errors.content).toString()}
							helpertext={formik.touched.content && formik.errors.content}
						/>
					</div>
					{formik.touched.content && formik.errors.content && <p className={styles.inputWrapper__text}>
						<span>{formik.errors.content}</span>
					</p>}
				</div>
				<div className={styles.form__item}>
					<div className={`${styles.inputFile}`}
						onFocus={(e) => focus(e, styles.active)}
						onBlur={(e) => blur(e, formik.values.title, styles.active)}
					>
						<label htmlFor="image">
							Chose image
							<Field
								style={formik.touched.image && formik.errors.image ? { borderColor: 'red' } : {}}
								id="image"
								name="image"
								type="file"
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									formik.handleChange(e)
									handleFileChange(e)
								}}
								value={formik.values.image}
								accept="image/*,.png,.jpg,.jpeg,.webp"
								error={formik.touched.image && Boolean(formik.errors.image).toString()}
								helpertext={formik.touched.image && formik.errors.image}
							/>
						</label>
					</div>
					{uploading && <p>Uploading...</p>}
					{file && (
						<ul>
							<li>Name: {file.name}</li>
							<li>Type: {file.type}</li>
							<li>Size: {Math.floor(file.size / 1000)} kb</li>
						</ul>
					)}
					{file && <PreviewFile file={file} height={200} width={300} />}
					{formik.touched.image && formik.errors.image && <p className={styles.inputWrapper__text}>
						<span>{formik.errors.image}</span>
					</p>}
				</div>
				<div className={styles.form__item}>
					{isLoading
						? 'Loading...'
						: <div className={`${styles.select}`}
						>
							<Field
								style={formik.touched.tagId && formik.errors.tagId ? { borderColor: 'red' } : {}}
								component="select"
								id="tagId"
								name="tagId"
								multiple={false}
							>
								<option value="">Select tag</option>
								{data?.map(elem => {
									return <option value={elem.id} key={elem.id}>{elem.name}</option>
								})}
							</Field>
							{formik.touched.tagId && formik.errors.tagId && <p className={styles.inputWrapper__text}>
								<span>{formik.errors.tagId}</span>
							</p>}
						</div>}
				</div>
				<FormBtn isEditing={isEditing} isLoadingPost={isLoadingPost} />
			</form>
			<ToastContainer position='top-center' hideProgressBar={true} theme={'light'} autoClose={2000} />
		</FormikProvider>
	)
}

export default CreatePostForm