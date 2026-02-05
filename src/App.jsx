import { useState } from "react";
import Editor from "./components/Editor";
import MemoryView from "./components/MemoryView";
import { createSteps, executeLine } from "./engine/interpreter";

export default function App() {
  const [code, setCode] = useState(
`let x = 5;
let y = 10;
let arr = [1, 2, 3];
x = x + y;`
  );
  const [ifState, setIfState] = useState(null);
  const [activeArrayAccess, setActiveArrayAccess] = useState(null);
  const [loopState, setLoopState] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [memory, setMemory] = useState({});

  function start() {
    setSteps(createSteps(code));
    setCurrentStep(0);
    setMemory({});
  }

  function nextStep() {
  // ================= IF BLOCK (HIGHEST PRIORITY) =================
  if (ifState) {
    const { body, index } = ifState;
    const line = body[index];

    setActiveArrayAccess(null);

    const updatedMemory = executeLine(line, memory);
    setMemory(updatedMemory);

    if (index + 1 < body.length) {
      setIfState({ ...ifState, index: index + 1 });
    } else {
      setIfState(null);
        setCurrentStep(prev => prev + 1);

    }
    return;
  }

  // ================= LOOP BLOCK =================
  if (loopState) {
    const { body, index, increment, condition } = loopState;
    const currentLine = body[index];

    // Detect array access
    const arrayMatch = currentLine.match(/(\w+)\[(\w+)\]/);
    if (arrayMatch) {
      setActiveArrayAccess({
        array: arrayMatch[1],
        index: memory[arrayMatch[2]]?.value
      });
    } else {
      setActiveArrayAccess(null);
    }

    const updatedMemory = executeLine(currentLine, memory);
    setMemory(updatedMemory);

    if (index + 1 < body.length) {
      setLoopState({ ...loopState, index: index + 1 });
    } else {
      const memAfterInc = executeLine(increment, updatedMemory);

      const cond = eval(
        condition.replace(/[a-zA-Z]+/g, v => memAfterInc[v]?.value)
      );

      setMemory(memAfterInc);

      if (cond) {
        setLoopState({ ...loopState, index: 0 });
      } else {
        setLoopState(null);
        setCurrentStep(currentStep + 1);
        setActiveArrayAccess(null);
      }
    }
    return;
  }

  // ================= NORMAL STEP =================
  const step = steps[currentStep];
  if (!step) return;

  setActiveArrayAccess(null);

  // ---------- IF STEP ----------
  if (step.type === "if") {
    const cond = eval(
      step.condition.replace(/[a-zA-Z]+/g, v => memory[v]?.value)
    );

    const branch = cond ? step.thenBody : step.elseBody;

    if (branch.length > 0) {
      setIfState({
        body: branch,
        index: 0
      });
    } else {
      setCurrentStep(currentStep + 1);
    }
    return;
  }

  // ---------- NORMAL LINE ----------
  if (step.type === "line") {
    setMemory(executeLine(step.code, memory));
    setCurrentStep(currentStep + 1);
  }

  // ---------- LOOP STEP ----------
  if (step.type === "loop") {
    const memAfterInit = executeLine(step.init, memory);
    setMemory(memAfterInit);

    const cond = eval(
      step.condition.replace(/[a-zA-Z]+/g, v => memAfterInit[v]?.value)
    );

    if (cond) {
      setLoopState({
        body: step.body,
        increment: step.increment,
        condition: step.condition,
        index: 0
      });
    } else {
      setCurrentStep(currentStep + 1);
    }
  }
}


function getExecutingText() {
  // IF block has highest priority
  if (ifState) {
    return `If body: ${ifState.body[ifState.index]}`;
  }

  const step = steps[currentStep]; // ✅ declared FIRST
  if (!step) return "";

  if (step.type === "line") {
    return step.code;
  }

  if (step.type === "loop") {
    return `for (${step.init}; ${step.condition}; ${step.increment})`;
  }

  if (step.type === "if") {
    return `if (${step.condition})`;
  }

  return "";
}

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🧠 Code Visualizer</h1>
          <p>Step-by-step code execution</p>
        </div>
      </header>

      <main className="main">
        <section className="panel editor-panel">
          <Editor code={code} onChange={setCode} />
        </section>

        <section className="panel memory-panel">
          <MemoryView 
          memory={memory} 
          activeArrayAccess={activeArrayAccess}
          />
        </section>
      </main>

      <footer className="footer">
        <button onClick={start}>▶ Start</button>
        <button onClick={nextStep} disabled={currentStep >= steps.length}>
          ⏭ Next
        </button>

        <span className="executing">
            {getExecutingText() && `Executing: ${getExecutingText()}`}
        </span>

      </footer>
    </div>
  );
}
