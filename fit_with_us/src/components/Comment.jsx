export default function Comment({comment}) {
  const {date, message, username} = comment
  return (
    <div>
    {username}: {message}
    </div>
  )
} 