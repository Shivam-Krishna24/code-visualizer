import VariableBlock from "./VariableBlock";

export default function MemoryView({ memory, activeArrayAccess }) {
  return (
    <div>
      <h2>Memory</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12
        }}
      >
        {Object.entries(memory).map(([name, data]) => (
          <VariableBlock
            key={name}
            name={name}
            data={data}
            activeArrayAccess={activeArrayAccess}
          />
        ))}
      </div>
    </div>
  );
}
