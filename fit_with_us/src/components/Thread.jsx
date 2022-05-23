import Comment from "./Comment";
import CommentReply from "./CommentReply";

export default function Thread({
  newComment,
  username,
  message,
  comments,
  postID,
  commentClass,
  commentError,
  setCommentClass,
  setCommentError
}) {
  const commentArray = comments
    .filter((comment) => {
      return comment.parent_id === postID;
    })
    .map((comment) => {
      return <Comment comment={comment} />;
    });

  return (
    <div className="card mb-2">
      <div className="card-content mb-0">
        <div className="media mb-0">
          <div className="media-content">
            <p className="username title is-6">{username}</p>
          </div>
        </div>
        <div className="content mb-2">{message}</div>
        <CommentReply post_id={postID} newComment={newComment} commentClass={commentClass} commentError={commentError} setCommentClass={setCommentClass} setCommentError={setCommentError}/>
        {commentArray}
      </div>
    </div>
  );
}
