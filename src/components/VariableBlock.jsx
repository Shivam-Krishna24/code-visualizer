export default function VariableBlock({
  name,
  data,
  activeArrayAccess
}) {
  const { type, value } = data;

  return (
    <div className="var-block">
      <div className="var-header">
        <span className="var-name">{name}</span>
        <span className="var-type">{type}</span>
      </div>

      {Array.isArray(value) ? (
        <div className="array">
            {value.map((v, i) => {
            const isActive =
                activeArrayAccess &&
                activeArrayAccess.array === name &&
                activeArrayAccess.index === i;

            return (
                <div
                key={i}
                className={`cell ${isActive ? "active-cell" : ""}`}
                >
                {v}
                {isActive && (
                    <div className="floating-index">
                    i = {i}
                    </div>
                )}
                </div>
            );
            })}
        </div>
        ) : (
        <div className="scalar">{value}</div>
        )}

    </div>
  );
}
