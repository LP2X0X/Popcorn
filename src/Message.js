function Message({ error }) {
  return (
    <div className="message">
      <p>
        {error ? (
          <>
            <span>⛔️</span> <strong>{error}</strong>
          </>
        ) : (
          <em>
            <strong>LOADING...</strong>
          </em>
        )}
      </p>
    </div>
  );
}

export default Message;
