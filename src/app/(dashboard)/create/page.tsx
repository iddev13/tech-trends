import CreatePostForm from "@/components/forms/CreatePostForm"


const Create = () => {
	return (
		<div>
			<div className="container">
				<h1 className="text-center mb-5">Create</h1>
				<CreatePostForm isEditing={false} />
			</div>
		</div>
	)
}

export default Create