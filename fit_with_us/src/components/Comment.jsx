export default function Comment({comment}) {
  const {date, message, username} = comment
  return (
    <div class="card-content pb-0">
    <div class="media">
      <div class="media-content">
        <p class="title is-6">{username}</p>
      </div>
    </div>
      <div class="content">
       {message}
      </div>
  </div>
  )
} 