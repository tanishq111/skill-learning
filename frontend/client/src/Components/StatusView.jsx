const StatusView = ({ title, children, actionLabel, onAction, tone = "neutral" }) => {
  return (
    <section
      className={`status-view status-view--${tone}`}
      role={tone === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
      {onAction ? (
        <button className="button" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
};

export const LoadingState = ({ message = "Loading..." }) => (
  <StatusView title={message}>
    Please wait while we prepare this page.
  </StatusView>
);

export const EmptyState = ({ title, children }) => (
  <StatusView title={title}>{children}</StatusView>
);

export const ErrorState = ({ message, onRetry }) => (
  <StatusView
    title="Something went wrong"
    actionLabel="Try again"
    onAction={onRetry}
    tone="error"
  >
    {message}
  </StatusView>
);

export default StatusView;
