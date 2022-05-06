import Comment from "./Comment"

export default function Thread({username, message, comments, postID}) {

  const commentArray = comments.filter((comment) => {
    return comment.parent_id === postID
  } ).map(comment => {
    return <Comment comment={comment} />
  })
  // console.log(commentArray)
  return (
    <div>
    {username}<br/>
    {message}
      {commentArray}
    <br/>
    </div>
  )
}