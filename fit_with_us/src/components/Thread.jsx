import Comment from "./Comment"
import CommentReply from "./CommentReply"

export default function Thread({newComment, users,username, message, comments, postID}) {

  const commentArray = comments.filter((comment) => {
    return comment.parent_id === postID
  } ).map(comment => {
    return <Comment comment={comment} />
  })
  // console.log(commentArray)
  return (
    // <div>
    // {username}<br/>
    // {message}
    //   {commentArray}
    // <CommentReply post_id={postID} newComment={newComment}/>
    // <br/>
    // </div>
    <div class="card mb-2">
      <div class="card-content mb-0">
        <div class="media">
          <div class="media-content">
            <p class="title is-6">{username}</p>
          </div>
        </div>
          <div class="content">
           {message}
          </div>
          
          {commentArray}
      </div>
    </div>
  );
}