export function createSteps(code) {
  const lines = code
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  const steps = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ================= FOR LOOP =================
    if (line.startsWith("for")) {
      const loopMatch = line.match(
        /for\s*\(\s*(.+);(.+);(.+)\s*\)\s*\{/
      );

      if (!loopMatch) {
        console.error("Invalid for syntax:", line);
        i++;
        continue;
      }

      const init = loopMatch[1].trim();
      const condition = loopMatch[2].trim();
      const increment = loopMatch[3].trim();

      i++; // move inside loop body
      const body = [];

      while (i < lines.length && !lines[i].startsWith("}")) {
        body.push(lines[i]);
        i++;
      }

      i++; // skip closing }

      steps.push({
        type: "loop",
        init,
        condition,
        increment,
        body
      });

      continue;
    }

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

      i++; // skip }

      let elseBody = [];
      if (i < lines.length && lines[i].startsWith("else")) {
        i++;
        while (i < lines.length && !lines[i].startsWith("}")) {
          elseBody.push(lines[i]);
          i++;
        }
        i++;
      }

      steps.push({
        type: "if",
        condition,
        thenBody,
        elseBody
      });

      continue;
    }

    // ================= NORMAL LINE =================
    steps.push({ type: "line", code: line });
    i++;
  }

  console.log("STEPS:", steps); // keep this
  return steps;
}


export function executeLine(line, memory) {
  const newMemory = { ...memory };
  line = line.replace(";", "").trim();

  // ================= DECLARATION =================
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

  // ================= ASSIGNMENT =================
  const assignMatch = line.match(/^(\w+)\s*=\s*(.+)$/);
  if (!assignMatch) return newMemory;

  const [, name, expr] = assignMatch;

  let evaluatedExpr = expr;

  // 1️⃣ Replace arr[i]
  evaluatedExpr = evaluatedExpr.replace(
    /(\w+)\[(\w+)\]/g,
    (_, arrName, indexVar) => {
      const arr = newMemory[arrName]?.value;
      const idx = newMemory[indexVar]?.value;
      return arr?.[idx] ?? 0;
    }
  );

  // 2️⃣ Replace variables ONLY if they exist in memory
  evaluatedExpr = evaluatedExpr.replace(
    /\b[a-zA-Z]+\b/g,
    token => {
      if (newMemory[token]) {
        return newMemory[token].value;
      }
      return token; // leave numbers & unknowns untouched
    }
  );

  const evaluated = eval(evaluatedExpr);

  newMemory[name] = {
    ...(newMemory[name] || { type: "int" }),
    value: evaluated
  };

  return newMemory;
}
