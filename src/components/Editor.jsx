export default function Editor({ code, onChange }) {
  return (
    <>
      <h2 style={{ color: "#e5e7eb", marginBottom: 8 }}>Code Editor</h2>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          height: "100%",
          background: "#020617",
          color: "#e5e7eb",
          border: "1px solid #1e293b",
          borderRadius: 8,
          padding: 14,
          fontFamily: "monospace",
          fontSize: 15,
          resize: "none"
        }}
      />
    </>
  );
}
