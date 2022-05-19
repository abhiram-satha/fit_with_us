import Button from "./Button"
import Thread from "./Thread"
import Input from "./Input"
import "../styles/Posts.scss"
import BottomNav from "./BottomNav"

export default function Posts({posts, comments, newComment, newPost, users}) {
  
  let postsCopy = [...posts.posts]
  const parentPost = postsCopy.reverse().map(post=> {
    return <Thread newComment={newComment} key={post.id} postID={post.id} users={users} username={post.username} message={post.message} comments={comments}/>
  })


  
  return (
    <section class="section">
      <div class="columns is-two-thirds">
        <div class="column ">
          <form onSubmit={(newPost)} class="mb-4">
            <Input inputType="textarea" type="text" label="Let us know how you're getting on!" placeholder="Create a New Post" buttonName="Submit" />
            <Button name="Submit"/>
          </form>
          {parentPost}
        </div>
      </div>
    </section>
  )
}