const FormField = ({ id, label, error, hint, options, ...inputProps }) => {
  const descriptionIds = [
    hint ? `${id}-hint` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const shared = {
    id,
    "aria-describedby": descriptionIds || undefined,
    "aria-invalid": Boolean(error),
  };

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint ? (
        <span className="field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
      {options ? (
        <select {...shared} {...inputProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...shared} {...inputProps} />
      )}
      {error ? (
        <span className="field__error" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default FormField;
