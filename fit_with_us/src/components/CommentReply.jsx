import React from "react";
import Button from "./Button";
import Input from "./Input";

export default function CommentReply({ newComment, post_id, commentClass, commentError, setCommentClass, setCommentError}) {
  return (
    <div>
      <a>
        <details onClick={() => {
          setCommentClass("input");
          setCommentError(null)
          }}>
          <summary>Reply</summary>
          <form onSubmit={newComment}>
            <div className="field has-addons">
              <div className="control">
                <input
                  class={commentClass}
                  placeholder="Say something nice!"
                  type="text"
                  name="commentReply"
                  post_id={post_id}
                ></input>
              </div>
              <div className="control">
                <Button type="submit" name="Post Reply" />
              </div>
            </div>
            <p class="help is-danger pb-2 weight-help">{commentError}</p>
          </form>
        </details>
      </a>
    </div>
  );
}
