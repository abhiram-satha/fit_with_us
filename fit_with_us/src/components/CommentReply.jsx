export default function CommentReply ({onClick, post_id}) {
  // console.log(post_id)
  return (
    <div>
      <details>
        <summary>Reply</summary>
          <form action="http://localhost:8080/api/comments/" method="POST" onClick={onClick} >
              <input placeholder="Reply" type="text" name="commentReply"></input>
              <input type="submit" name="Post Reply"></input>
          </form>
      </details>
    </div>
  )
} 