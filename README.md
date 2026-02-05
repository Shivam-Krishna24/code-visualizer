🧠 CODE EXECUTION & ARRAY TRAVERSAL VISUALIZER

A STEP-BY-STEP CODE EXECUTION VISUALIZER FOR LEARNING LOOPS & ARRAY TRAVERSAL

# WHAT THIS PROJECT IS

This project is a controlled educational execution engine that visually explains how code runs, instead of only showing final output.

It focuses on making:

variable creation & mutation

loop execution

array traversal

memory state changes

visible and understandable.

# WHY THIS PROJECT EXISTS

Most beginners struggle because:

code runs too fast

memory changes are invisible

loops feel magical

array traversal is abstract

This project slows execution down and turns it into visual steps.

# HOW IT WORKS (HIGH-LEVEL)

This is NOT a full compiler or interpreter.

Instead:

code is parsed line-by-line

converted into explicit execution steps

executed one micro-step at a time

memory is tracked manually and visualized

This guarantees:

deterministic execution
no hidden behavior
perfect sync with visuals

# ARCHITECTURE OVERVIEW
## 1. PARSER (createSteps)

reads code as plain text

supports a restricted grammar

converts code into structured steps

## 2. EXECUTION ENGINE (executeLine)

executes exactly one step per click

updates a controlled memory object

handles:

variable declarations

assignments

array reads (arr[i])

Example memory state:

{
  sum: { type: "int", value: 6 },
  i:   { type: "int", value: 3 },
  arr: { type: "int", value: [1, 2, 3, 4] }
}

## 3. LOOP EXECUTION MODEL

Loops are NOT executed normally.

Each loop is broken into:

initialization

condition check

body execution

increment

Each part runs as a separate visual step.

## 4. UI (REACT)

LEFT PANEL → Code editor

RIGHT PANEL → Memory visualization

CONTROLS → Start | Next Step

# KEY STRENGTHS

✔ Step-by-step execution (debugger-like)
✔ Explicit memory visualization
✔ Array traversal with active index glow
✔ Deterministic & predictable behavior
✔ Designed for learning DSA fundamentals

# INPUT LIMITATIONS (IMPORTANT)

These are INTENTIONAL design choices.

## SUPPORTED SYNTAX

variable declarations (int, let, var)

assignments

array reads (arr[i])

for loops in STRICT FORMAT ONLY:

for (int i = 0; i < 5; i = i + 1) {
  sum = sum + arr[i];
}

## NOT SUPPORTED (BY DESIGN)

✖ i++, +=, --
✖ if / else, while
✖ nested loops
✖ array writes (arr[i] = x)
✖ functions or recursion
✖ dynamic loop bounds (i < n)
✖ complex expressions

These constraints exist to ensure:
clarity
determinism
clean visualization

# DESIGN PHILOSOPHY

“CLARITY OVER COMPLETENESS.”

Every feature exists only if it can be:

explained step-by-step

visualized accurately

executed predictably

# TECH STACK

• React
• JavaScript
• Custom execution engine
• Deployed on Vercel

# ONE-LINE SUMMARY

A visual execution engine that models program state and explains loops and array traversal step by step.
