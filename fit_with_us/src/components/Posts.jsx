import Button from "./Button";
import Thread from "./Thread";
import Input from "./Input";
import "../styles/Posts.scss";

export default function Posts({ posts, comments, newComment, newPost, users }) {
  let postsCopy = [...posts.posts];
  const parentPost = postsCopy.reverse().map((post) => {
    return (
      <Thread
        newComment={newComment}
        key={post.id}
        postID={post.id}
        users={users}
        username={post.username}
        message={post.message}
        comments={comments}
      />
    );
  });

  return (
    <section className="section">
      <div className="columns is-two-thirds">
        <div className="column ">
          <form onSubmit={newPost} className="mb-4">
            <Input
              inputType="textarea"
              type="text"
              label="Let us know how you're getting on!"
              placeholder="Create a New Post"
              buttonName="Submit"
            />
            <Button name="Submit" />
          </form>
          {parentPost}
        </div>
      </div>
    </section>
  );
}
