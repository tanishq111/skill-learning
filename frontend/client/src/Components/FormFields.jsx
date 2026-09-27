const FormField = ({ id, label, error, hint, ...inputProps }) => {
  const descriptionIds = [
    hint ? `${id}-hint` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint ? (
        <span className="field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
      <input
        id={id}
        aria-describedby={descriptionIds || undefined}
        aria-invalid={Boolean(error)}
        {...inputProps}
      />
      {error ? (
        <span className="field__error" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default FormField;
