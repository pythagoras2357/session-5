# Working Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It helps both human developers and AI assistants maintain context across sessions, making development more efficient and consistent.

## Two Types of Memory

### Persistent Memory
- **Location**: `.github/copilot-instructions.md`
- **Purpose**: Foundational project principles, workflows, and standards
- **Lifecycle**: Rarely changes; defines the "rules of the game"
- **Git Status**: Always committed

### Working Memory
- **Location**: `.github/memory/` directory
- **Purpose**: Discoveries, patterns, and session-specific learnings
- **Lifecycle**: Evolves with each development session
- **Git Status**: Mixed (see Directory Structure below)

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical session summaries (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns (COMMITTED)
└── scratch/
    ├── .gitignore               # Ignores all files in scratch/
    └── working-notes.md         # Active session notes (NOT COMMITTED)
```

### File Purposes

#### `session-notes.md` (Committed)
- **What**: Summaries of completed development sessions
- **When**: Updated at the END of each session
- **Content**: High-level accomplishments, key decisions, outcomes
- **Why Committed**: Historical record for future reference

#### `patterns-discovered.md` (Committed)
- **What**: Reusable code patterns and architectural decisions
- **When**: Updated when you discover a pattern worth documenting
- **Content**: Pattern name, context, problem, solution, examples
- **Why Committed**: Knowledge base that grows over time

#### `scratch/working-notes.md` (NOT Committed)
- **What**: Real-time notes during active development
- **When**: Updated continuously during your session
- **Content**: Current task, approach, findings, blockers, next steps
- **Why Not Committed**: Ephemeral, messy, and session-specific

## When to Use Each File

### During TDD Workflow

**Active Session (`scratch/working-notes.md`):**
- Note which test you're working on
- Document why a test is failing
- Track your hypothesis for the fix
- Record unexpected behaviors

**End of Session (`session-notes.md`):**
- Summarize which tests were fixed
- Note any test patterns that emerged
- Document decisions about test structure

**Pattern Discovery (`patterns-discovered.md`):**
- Document test setup patterns that work well
- Capture mock/stub strategies
- Record common assertion patterns

### During Linting Workflow

**Active Session (`scratch/working-notes.md`):**
- List categories of lint errors found
- Track which categories you've fixed
- Note any ESLint rules to discuss with team

**End of Session (`session-notes.md`):**
- Summarize overall code quality improvements
- Note any major refactorings performed

**Pattern Discovery (`patterns-discovered.md`):**
- Document best practices that prevent lint errors
- Capture code organization patterns

### During Debugging Workflow

**Active Session (`scratch/working-notes.md`):**
- Describe the bug symptoms
- Track debugging steps taken
- Note hypotheses (right or wrong)
- Document the root cause when found
- Record the fix approach

**End of Session (`session-notes.md`):**
- Summarize bugs fixed
- Note any systemic issues discovered

**Pattern Discovery (`patterns-discovered.md`):**
- Document common bug patterns
- Capture debugging strategies that work
- Record error-prone code patterns to avoid

## How AI Uses This Memory

When you ask GitHub Copilot for help:

1. **Copilot reads `.github/copilot-instructions.md`** for project principles
2. **Copilot references `.github/memory/patterns-discovered.md`** for known patterns
3. **Copilot checks `.github/memory/session-notes.md`** for recent context
4. **You share `.github/memory/scratch/working-notes.md`** when providing context

This enables context-aware suggestions like:
- "Based on the initialization pattern we documented, you should..."
- "The last session notes show you were working on X, continuing with..."
- "This is similar to the pattern we discovered in session-notes.md..."

## Workflow Example

### Start of Session
```bash
# Open your working notes
code .github/memory/scratch/working-notes.md

# Write:
## Current Task
Implement DELETE /api/todos/:id endpoint

## Approach
1. Write failing test first (TDD)
2. Implement minimal code to pass
3. Add error handling
```

### During Session
```bash
# Update working notes as you go:
## Key Findings
- Array.filter() doesn't modify original array, need to reassign
- Need to return 404 if todo not found
- parseInt() required for id from params

## Decisions Made
- Return 204 No Content on successful delete
- Return 404 with error message if not found
```

### End of Session
```bash
# Summarize into session-notes.md:
## Session: Implement DELETE endpoint - Nov 11, 2025
### Accomplished
- Wrote tests for DELETE /api/todos/:id
- Implemented endpoint with error handling
- All tests passing

### Key Findings
- Must reassign todos array after filter operation
- params come as strings, need parseInt()

### Outcomes
- DELETE endpoint fully functional
- Learned array mutation patterns in Express
```

### Pattern Discovery
```bash
# If pattern is reusable, add to patterns-discovered.md:
## Pattern: Array Filtering in Express Routes
**Context**: Deleting items from in-memory array storage
**Problem**: Array.filter() doesn't modify original
**Solution**: Reassign to storage variable
**Example**: todos = todos.filter(t => t.id !== id)
```

## Best Practices

### DO ✅
- Keep `scratch/working-notes.md` messy and stream-of-consciousness
- Update notes in real-time as you discover things
- Be specific about what worked and what didn't
- Document dead ends (they're valuable learning)
- Summarize key learnings at end of session
- Commit `session-notes.md` and `patterns-discovered.md` regularly

### DON'T ❌
- Don't wait until end to write everything
- Don't commit `scratch/working-notes.md` (it's in .gitignore)
- Don't be too formal in working notes (they're for you)
- Don't skip the end-of-session summary
- Don't document everything as a pattern (be selective)

## Memory Lifecycle

```
Active Session → Working Notes (scratch/working-notes.md)
                      ↓
                Session End → Summarize
                      ↓
                Session Notes (session-notes.md) [COMMIT]
                      ↓
                Pattern Emerged? → Yes → Document Pattern (patterns-discovered.md) [COMMIT]
                      ↓
                     No → Done
```

## Getting Started

1. **Start your session:**
   ```bash
   code .github/memory/scratch/working-notes.md
   ```

2. **Write your current task and approach**

3. **Take notes as you work** (findings, decisions, blockers)

4. **End your session:**
   - Summarize key findings into `session-notes.md`
   - Document any patterns in `patterns-discovered.md`
   - Commit both files

5. **Next session:**
   - Clear/reset `scratch/working-notes.md` for fresh start
   - Review `session-notes.md` to recall context

## Benefits

- **Continuity**: Pick up where you left off
- **Learning**: Track what works and what doesn't
- **Context**: Give AI better information for suggestions
- **Documentation**: Historical record of development
- **Patterns**: Build a project-specific knowledge base
- **Debugging**: Reference past solutions to similar problems

---

**Remember**: The memory system is a tool, not a burden. If it's slowing you down, simplify it. The goal is to make development easier, not harder.
