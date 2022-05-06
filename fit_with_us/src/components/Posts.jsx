import Button from "./Button"
import Thread from "./Thread"

export default function Posts({posts, comments, onClick}) {
  

  const parentPost = posts.posts.map(post=> {
    return <Thread key={post.id} postID={post.id} username={post.username} message={post.message} comments={comments}/>
  })
  
  return (
    <>
    <form action="http://localhost:8080/api/posts" method="POST">
    <input type="text" placeholder="Create a New Post" name="message"/>
    <input type="submit" name="Create Post" onClick={onClick}/>
    </form>
    {parentPost}
    </>
  )
}