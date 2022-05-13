import Button from "./Button"
import Thread from "./Thread"
import Form from "./Form"

export default function Posts({posts, comments, newComment, newPost, users}) {
  
  let postsCopy = [...posts.posts]
  const parentPost = postsCopy.reverse().map(post=> {
    return <Thread newComment={newComment} key={post.id} postID={post.id} users={users} username={post.username} message={post.message} comments={comments}/>
  })


  
  return (
    <section class="section">
      <div class="columns is-two-thirds">
        <div class="column ">
          <Form onSubmit={(newPost)} inputType="textarea" type="text" label="Let us know how you're getting on!" placeholder="Create a New Post" buttonName="Submit" />
          {parentPost}
        </div>
      </div>
    </section>
  );
}