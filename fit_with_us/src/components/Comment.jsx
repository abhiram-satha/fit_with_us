export default function Comment({ comment }) {
  const { date, message, username } = comment;
  return (
    <div className="card-content pb-0">
      <div className="media mb-0">
        <div className="media-content">
          <p className="username title is-6">{username}</p>
        </div>
      </div>
      <div className="content">{message}</div>
    </div>
  );
}
