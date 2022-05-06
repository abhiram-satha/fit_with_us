import Thread from "./Thread"

export default function Posts({posts, comments, onClick}) {
  
  // const listOfPosts = 

  const parentPost = posts.posts.map(post=> {
    return <Thread key={post.id} postID={post.id} username={post.username} message={post.message} comments={comments}/>
  })
  
  return (
    <>
    <form onClick={(event)=>{onClick(event, 1)}}>
    <input type="text" placeholder="Create a New Post" name="newPost"/>
    <input type="submit" />
    </form>
    {parentPost}
    </>
  )
}