#🧠 Code Execution & Array Traversal Visualizer#

A step-by-step code execution visualizer designed to make program execution visible, especially for loops and array traversal.

This project is a controlled educational execution engine, not a full compiler or interpreter.
It prioritizes clarity, determinism, and visual correctness over language completeness.

🚀 What This Project Does

Instead of executing real JavaScript, this tool:

Parses code into explicit execution steps

Executes one micro-step at a time

Maintains an explicit memory model

Visually renders:

variable creation & mutation

loop execution flow

array traversal with active index highlighting

👉 Learners can see how code runs internally, not just the final output.

🎯 Why This Project Exists

Many beginners struggle because:

Code runs too fast

Memory changes are invisible

Loops feel “magical”

Array traversal is abstract

This project slows execution down and makes program state visible at every step.

🏗️ Architecture Overview
🔹 1. Parser (createSteps)

Reads code as plain text

Supports a restricted grammar

Converts code into structured execution steps
(line, loop, etc.)

🔹 2. Execution Engine (executeLine)

Executes exactly one step per click

Updates a controlled memory object

Handles:

variable declarations

assignments

array reads (arr[i])

Example Memory State:

{
  sum: { type: "int", value: 6 },
  i:   { type: "int", value: 3 },
  arr: { type: "int", value: [1, 2, 3, 4] }
}

🔹 3. Loop Execution Model

Loops are not executed normally

Each loop is broken into:

initialization

condition check

body execution

increment

Each part executes as a separate visual step

This makes loop execution fully explainable and visualizable.

🔹 4. UI (React)

Left panel: Code editor

Right panel: Memory visualization

Controls:

▶️ Start

⏭️ Next step

✨ Key Features

🧩 Step-by-step execution (debugger-like)

🧠 Explicit memory visualization

🔥 Array traversal with live index glow

🔒 Deterministic, predictable behavior

📈 Scales well for large arrays

🎓 Designed for learning DSA fundamentals

⚠️ Intentional Limitations

This is not a general-purpose language interpreter.

✅ Supported Syntax

Variable declarations (int, let, var)

Assignments

Array reads (arr[i])

for loops in strict format only:

for (int i = 0; i < 5; i = i + 1) {
  sum = sum + arr[i];
}

❌ Not Supported (By Design)

i++, +=, --

if / else, while

Nested loops

Array writes (arr[i] = x)

Functions or recursion

Dynamic loop bounds (i < n)

Complex expressions

Full error reporting (planned)

👉 These constraints exist to guarantee:

deterministic execution

clean visualization

zero hidden behavior

🧠 Design Philosophy
Clarity over completeness.

Every feature exists only if it can be:

executed deterministically

visualized cleanly

explained step-by-step

🛠️ Tech Stack

⚛️ React

🟨 JavaScript

🧩 Custom execution engine (no real JS execution)

☁️ Deployed on Vercel

🔮 Possible Extensions

Error reporting

if execution visualization

Array write support

Auto-play / pause

Step backward

Nested loops & 2D arrays

Recursion stack visualization

🧑‍💻 Who This Is For

DSA learners

College students

Educators explaining loops & arrays

Recruiters evaluating system-thinking projects

🏁 One-Line Summary

A visual execution engine that models program state and explains loops and array traversal step by step.
