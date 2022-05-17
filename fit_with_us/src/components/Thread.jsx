import Comment from "./Comment"
import CommentReply from "./CommentReply"

export default function Thread({newComment, users,username, message, comments, postID}) {

  const commentArray = comments.filter((comment) => {
    return comment.parent_id === postID
  } ).map(comment => {
    return <Comment comment={comment} />
  })

  return (
    <div>
    {username}<br/>
    {message}
      {commentArray}
    <CommentReply post_id={postID} newComment={newComment}/>
    <br/>
    </div>
  )
}