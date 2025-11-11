# Patterns Discovered

## Purpose

This file documents reusable code patterns, architectural decisions, and best practices discovered during development. Each pattern includes context, problem, solution, and examples to help both humans and AI apply these patterns consistently.

**Update this file when you discover a pattern worth documenting and reusing.**

---

## Pattern Template

```markdown
## Pattern: [Pattern Name]

**Context**: [When/where this pattern applies]

**Problem**: [What problem does this solve]

**Solution**: [How to solve it]

**Example**:
```[language]
[Code example]
```

**Related Files**: [Which files use this pattern]

**Notes**: [Any additional considerations]
```

---

## Example Pattern

## Pattern: Service Initialization - Empty Array vs Null

**Context**: When initializing in-memory storage for the TODO service

**Problem**: Array must be initialized before use, but choosing between empty array `[]` and `null` affects error handling and type checking

**Solution**: Initialize with empty array `[]` for immediate usability

**Example**:
```javascript
// ✅ Good: Empty array initialization
let todos = [];

// Later in code:
app.get('/api/todos', (req, res) => {
  res.json(todos); // Always safe, returns [] if no todos
});

// ❌ Avoid: Null initialization
let todos = null;

// Later in code:
app.get('/api/todos', (req, res) => {
  res.json(todos || []); // Requires null check everywhere
});
```

**Related Files**: 
- `packages/backend/src/app.js`

**Notes**: 
- Empty array is "truthy" in JavaScript, making conditional logic simpler
- Eliminates null/undefined checks throughout the codebase
- Array methods (filter, map, find) work immediately without guards
- Consistent with JavaScript best practices for collection initialization

---

## Discovered Patterns

<!-- Add your patterns below this line -->
