import axios from "axios"
import Button from "./Button"
import Thread from "./Thread"

export default function Posts({posts, comments, onClick, newPost}) {
  

  const parentPost = posts.posts.map(post=> {
    return <Thread onClick={onClick} key={post.id} postID={post.id} username={post.username} message={post.message} comments={comments}/>
  })


  
  return (
    <>
    <form onSubmit={(newPost)}>
    {/* <form action="http://localhost:8080/api/posts"  onClick={onClick} method="POST"> */}
    <input type="text" placeholder="Create a New Post" name="message"/>
    <input type="submit" name="Create Post"/>
    </form>
    {parentPost}
    </>
  )
}