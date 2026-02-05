export function createSteps(code) {
  const lines = code
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const steps = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ================= IF BLOCK =================
    if (line.startsWith("if")) {
      const condMatch = line.match(/if\s*\((.+)\)\s*\{/);
      if (!condMatch) {
        console.error("Invalid if syntax:", line);
        i++;
        continue;
      }

      const condition = condMatch[1].trim();
      i++;

      const thenBody = [];
      while (i < lines.length && !lines[i].startsWith("}")) {
        thenBody.push(lines[i]);
        i++;
      }

      i++; // skip closing }

      let elseBody = [];

      // Handle `else {`
      if (i < lines.length && lines[i].startsWith("else")) {
        i++; // skip else {
        while (i < lines.length && !lines[i].startsWith("}")) {
          elseBody.push(lines[i]);
          i++;
        }
        i++; // skip closing }
      }

      steps.push({
        type: "if",
        condition,
        thenBody,
        elseBody
      });

      continue; // i already moved correctly
    }

    // ================= NORMAL LINE =================
    steps.push({ type: "line", code: line });
    i++;
  }

  console.log("STEPS:", steps); // 🔥 DEBUG (KEEP THIS FOR NOW)
  return steps;
}

export function executeLine(line, memory) {
  const newMemory = { ...memory };
  line = line.replace(";", "").trim();

  // Declaration: let x = 5 | int x = 5 | var x = 5
  const declMatch = line.match(/^(let|var|int)\s+(\w+)\s*=\s*(.+)$/);

  if (declMatch) {
    const [, type, name, rawValue] = declMatch;

    let value;
    if (rawValue.startsWith("[")) {
      value = JSON.parse(rawValue);
    } else if (!isNaN(rawValue)) {
      value = Number(rawValue);
    } else {
      value = newMemory[rawValue]?.value;
    }

    newMemory[name] = { type, value };
    return newMemory;
  }

  // Assignment: x = x + y
  const assignMatch = line.match(/^(\w+)\s*=\s*(.+)$/);

if (assignMatch) {
  const [, name, expr] = assignMatch;

  // Replace arr[i] with actual value
  let evaluatedExpr = expr.replace(
    /(\w+)\[(\w+)\]/g,
    (_, arrName, indexVar) => {
      const arr = newMemory[arrName]?.value;
      const idx = newMemory[indexVar]?.value;
      return arr?.[idx];
    }
  );

  // Replace variables with values
  evaluatedExpr = evaluatedExpr.replace(
    /\b[a-zA-Z]+\b/g,
    v => newMemory[v]?.value
  );

  const evaluated = eval(evaluatedExpr);

  newMemory[name] = {
    ...newMemory[name],
    value: evaluated
  };
}
  return newMemory;
}


