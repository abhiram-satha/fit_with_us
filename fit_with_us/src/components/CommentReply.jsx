export default function CommentReply ({newComment, post_id}) {
  // console.log(post_id)
  return (
    <div>
      <details>
        <summary>Reply</summary>
          <form onSubmit={newComment}>
              <input placeholder="Reply" type="text" name="commentReply" post_id={post_id}></input>
              <input type="submit" name="Post Reply"></input>
          </form>
      </details>
    </div>
  )
} 