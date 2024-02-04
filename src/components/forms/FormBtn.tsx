import { FC } from 'react'

interface IFormBtn {
	isLoadingPost: boolean
	isEditing: boolean
}

const FormBtn: FC<IFormBtn> = ({ isEditing, isLoadingPost }) => {
	return (
		<button type="submit" disabled={isLoadingPost} className='inline-flex flex-nowrap items-center py-2 px-5 bg-sky-500 transition-all capitalize hover:bg-sky-600 rounded-lg'>
			{isLoadingPost && <span>Loading...</span>}
			{isEditing ? !isLoadingPost && 'update' : !isLoadingPost && 'create'}
		</button>
	)
}

export default FormBtn