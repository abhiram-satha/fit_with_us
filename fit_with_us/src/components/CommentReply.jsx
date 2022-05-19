import React from "react"
import Button from "./Button"
import Input from "./Input"

export default function CommentReply ({newComment, post_id}) {

  return (
    <div>
      <a>
      <details>
        <summary>Reply</summary>
          <form onSubmit={newComment}>
            <div class="field has-addons">
              <div class="control">
              <input class="input" placeholder="Say something nice!" type="text" name="commentReply" post_id={post_id}></input>
              </div>
              <div class="control">
                <Button type="submit" name="Post Reply"/>
              </div>
            </div>
          </form>
      </details>
      </a>
    </div>
  )
} 