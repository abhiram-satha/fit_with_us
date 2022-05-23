import Button from "./Button";
import Thread from "./Thread";
import Input from "./Input";
import "../styles/Posts.scss";

export default function Posts({ posts, comments, newComment, newPost, postError, postClass, commentError, commentClass, setCommentError, setCommentClass }) {
  let postsCopy = [...posts.posts];
  const parentPost = postsCopy.reverse().map((post) => {
    return (
      <Thread
        newComment={newComment}
        key={post.id}
        postID={post.id}
        username={post.username}
        message={post.message}
        comments={comments}
        commentError={commentError}
        commentClass={commentClass}
        setCommentClass={setCommentClass} 
        setCommentError={setCommentError}
      />
    );
  });

  return (
    <section className="section">
      <div className="columns is-two-thirds">
        <div className="column ">
          <form onSubmit={newPost} className="mb-4">
            <Input
              class={postClass}
              inputType="textarea"
              type="text"
              label="Let us know how you're getting on!"
              placeholder="Create a New Post"
              buttonName="Submit"
            />
            <p class="help is-danger pb-2 weight-help">{postError}</p>
            <Button name="Submit" />
          </form>
          {parentPost}
        </div>
      </div>
    </section>
  );
}
