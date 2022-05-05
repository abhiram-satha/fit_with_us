import Thread from "./Thread"

export default function Posts({posts, comments}) {
  
  // const listOfPosts = 

  const parentPost = posts.posts.map(post=> {
    return <Thread key={post.id} postID={post.id} username={post.username} message={post.message} comments={comments}/>
  })
  
  return (
    <>
    {parentPost}
    </>
  )
}