import PostCard from "@/components/cards/PostCard"
import { db } from "@/lib/db"

const getPosts = async () => {
  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      createdAt: false,
      uspateAt: false,
      tag: true,
      tagId: false,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return response
}

const Home = async () => {
  const posts = await getPosts()
  // console.log(posts);

  return (
    <div>
      <div className="container">
        <section>
          <h2 className="text-3xl capitalize text-center mb-5">posts</h2>
          <div className="relative md:grid md:items-center md:justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {posts.map(elem => {
              return <PostCard title={elem.title} url={`/posts/${elem.id}`} label='Read more' imageUrl={elem.image}
                text={elem.content} tag={elem.tag} key={elem.id}
              />
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home