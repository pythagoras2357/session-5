# GitHub Copilot Instructions for TODO Application

## Project Context

This is a full-stack TODO application with a React frontend and Express backend, designed for iterative, feedback-driven development practice.

**Current Status:**
- Architecture: Monorepo with `packages/frontend` (React) and `packages/backend` (Express)
- Development Phase: Backend stabilization and frontend feature completion
- Learning Focus: Agentic Development with AI coding assistants
- Contains intentional bugs and incomplete implementations for learning purposes

**Key Technologies:**
- Frontend: React 18, Material-UI v5, React Query, React Testing Library
- Backend: Node.js, Express.js, Jest, Supertest
- Development: npm workspaces, GitHub Actions, ESLint

## Documentation References

For detailed information about this project, refer to:

- **[docs/project-overview.md](../docs/project-overview.md)** - Complete architecture, tech stack, project structure, and intentional issues for learning
- **[docs/testing-guidelines.md](../docs/testing-guidelines.md)** - Comprehensive test patterns, TDD workflow, and testing standards for both backend and frontend
- **[docs/workflow-patterns.md](../docs/workflow-patterns.md)** - Step-by-step development workflow guidance and AI collaboration patterns

These documents provide the foundation for understanding how to work effectively on this project.

## Development Principles

All development work on this project follows these core principles:

1. **Test-Driven Development (TDD)**: Follow the Red-Green-Refactor cycle
   - RED: Write test or run failing test
   - GREEN: Write minimal code to pass the test
   - REFACTOR: Improve code quality while keeping tests green

2. **Incremental Changes**: Make small, testable modifications
   - One feature or fix at a time
   - Test after each change
   - Commit working states frequently

3. **Systematic Debugging**: Use test failures as guides
   - Read error messages carefully
   - Isolate the problem
   - Fix and verify
   - Don't skip steps

4. **Validation Before Commit**: Ensure quality gates pass
   - All tests must pass (`npm test`)
   - No ESLint errors (`npm run lint`)
   - Manual verification for UI changes

## Testing Scope

**This project uses unit tests and integration tests ONLY.**

### What We DO Use:
- ✅ **Backend**: Jest + Supertest for API endpoint testing
- ✅ **Frontend**: React Testing Library for component unit/integration tests
- ✅ **Manual Testing**: Browser-based verification of complete UI flows

### What We DO NOT Use:
- ❌ **E2E Frameworks**: No Playwright, Cypress, or Selenium
- ❌ **Browser Automation**: No automated browser testing tools
- ❌ **Full Application E2E**: Manual testing serves this purpose

**Reason**: Keep the lab focused on TDD principles with unit/integration tests without the added complexity of e2e test infrastructure, flakiness management, and maintenance overhead.

### Testing Approach by Context

**For Backend API Changes:**
1. Write Jest tests FIRST (or identify failing tests)
2. Run tests to see them fail (RED)
3. Implement the minimum code to pass (GREEN)
4. Refactor if needed while keeping tests green (REFACTOR)
5. This is TRUE TDD: Test first, then code to pass the test

**For Frontend Component Features:**
1. Write React Testing Library tests FIRST for component behavior
2. Run tests to see them fail (RED)
3. Implement the component logic to pass (GREEN)
4. Refactor while keeping tests green (REFACTOR)
5. Follow with manual browser testing for full UI flows and visual verification
6. This is TRUE TDD: Test first, then code to pass the test

**Critical Rule**: Always write tests BEFORE implementing the feature. This is the essence of Test-Driven Development.

## Workflow Patterns

Follow these development workflows for consistent, high-quality development:

### 1. TDD Workflow (Red-Green-Refactor)
```
Write/fix tests → Run tests → Fail (RED) → Implement code → Pass (GREEN) → Refactor → Commit
```

**Steps:**
- Understand the test requirements
- Run test to confirm it fails (RED phase)
- Implement minimal code to pass
- Run test to confirm it passes (GREEN phase)
- Refactor to improve code quality
- Verify tests still pass
- Move to next test

### 2. Code Quality Workflow
```
Run lint → Categorize issues → Fix systematically → Re-validate → Commit clean code
```

**Steps:**
- Run `npm run lint` to identify all issues
- Group errors by type (unused vars, console statements, etc.)
- Fix one category at a time
- Re-run lint after each category
- Don't proceed until lint is clean

### 3. Integration Workflow
```
Identify issue → Debug with context → Write/update test → Fix code → Verify end-to-end
```

**Steps:**
- Run the application (`npm run start`)
- Test user flows manually
- Document observed issues
- Write or update tests to catch the issue
- Fix the code to pass tests
- Verify fix works in running application
- Test edge cases

## Chat Mode Usage

This project uses specialized GitHub Copilot chat modes for different types of work:

### @tdd-developer Mode
**When to use:**
- Writing new tests
- Making failing tests pass
- Following Red-Green-Refactor cycles
- Implementing test-driven features
- Debugging test failures

**Example prompts:**
- "Write a test for the DELETE /api/todos/:id endpoint"
- "Help me make this failing test pass: [paste test]"
- "Run tests and help me fix failures one by one"

### @code-reviewer Mode
**When to use:**
- Addressing ESLint errors
- Improving code quality
- Refactoring for better patterns
- Code cleanup and organization
- Ensuring best practices

**Example prompts:**
- "Review this code for ESLint violations"
- "Help me fix all unused variable warnings"
- "Suggest refactorings to improve this function"

## Memory System

This project uses a working memory system to track development discoveries and maintain context across sessions.

### Memory Types

**Persistent Memory**:
- **Location**: `.github/copilot-instructions.md` (this file)
- **Purpose**: Foundational principles, workflows, and project standards
- **Lifecycle**: Rarely changes

**Working Memory**:
- **Location**: `.github/memory/` directory
- **Purpose**: Session discoveries, code patterns, and accumulated learnings
- **Lifecycle**: Evolves with each development session

### Memory Files

#### `.github/memory/session-notes.md` (Committed)
- Historical summaries of completed sessions
- Updated at the END of each session
- Provides context for future work
- Tracks what was accomplished and key decisions made

#### `.github/memory/patterns-discovered.md` (Committed)
- Reusable code patterns and architectural decisions
- Updated when you discover a pattern worth documenting
- Used by AI to provide consistent, context-aware suggestions
- Examples: initialization patterns, error handling strategies, etc.

#### `.github/memory/scratch/working-notes.md` (NOT Committed)
- Real-time notes during active development
- Updated continuously as you work
- Ephemeral and messy - your personal scratch space
- At session end, summarize key findings into `session-notes.md`

### Using the Memory System

**During Active Development:**
1. Take notes in `.github/memory/scratch/working-notes.md`
2. Document current task, approach, findings, and blockers
3. Keep notes stream-of-consciousness and detailed

**At End of Session:**
1. Summarize key findings into `.github/memory/session-notes.md`
2. Document any reusable patterns in `.github/memory/patterns-discovered.md`
3. Commit both `session-notes.md` and `patterns-discovered.md`
4. Clear/reset `scratch/working-notes.md` for next session

**When Asking AI for Help:**
- Reference patterns from `patterns-discovered.md` for consistency
- Share relevant findings from `session-notes.md` for context
- Paste from `scratch/working-notes.md` when providing detailed context

**For Complete Documentation:**
See [`.github/memory/README.md`](memory/README.md) for comprehensive guidance on using the memory system.

## Workflow Utilities

GitHub CLI commands are available to all chat modes for workflow automation:

### Issue Management Commands

**List all open issues:**
```bash
gh issue list --state open
```

**View specific issue details:**
```bash
gh issue view <issue-number>
```

**View issue with all comments:**
```bash
gh issue view <issue-number> --comments
```

### Exercise Workflow

- The main exercise issue will have **"Exercise:"** in the title
- Exercise steps are posted as **comments** on the main issue
- Use `gh issue view <issue-number> --comments` to see all steps
- Use these commands when prompted with `/execute-step` or `/validate-step`

### Example Workflow
```bash
# Find the exercise issue
gh issue list --state open

# View the exercise and all steps
gh issue view 1 --comments

# Follow the steps systematically
```

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

- `feat:` - New feature (e.g., `feat: add delete todo endpoint`)
- `fix:` - Bug fix (e.g., `fix: toggle bug in PATCH endpoint`)
- `test:` - Adding or updating tests (e.g., `test: add validation tests for POST`)
- `refactor:` - Code refactoring (e.g., `refactor: simplify error handling`)
- `docs:` - Documentation changes (e.g., `docs: update testing guidelines`)
- `chore:` - Maintenance tasks (e.g., `chore: fix ESLint warnings`)
- `style:` - Code style changes (e.g., `style: format with prettier`)

### Branch Strategy

**Feature branches:**
```bash
# Create feature branch
git checkout -b feature/<descriptive-name>

# Examples:
git checkout -b feature/delete-endpoint
git checkout -b feature/edit-todo-ui
git checkout -b fix/toggle-bug
```

**Main branch:**
- `main` is the primary branch
- Only merge working, tested code
- All tests must pass before merging

### Git Commands

**Always stage all changes before committing:**
```bash
git add .
git commit -m "feat: implement POST endpoint"
```

**Push to the correct branch:**
```bash
git push origin <branch-name>

# Example:
git push origin feature/delete-endpoint
```

**Check current branch and status:**
```bash
git status
git branch
```

### Commit Workflow

1. Make changes and test thoroughly
2. Ensure all tests pass: `npm test`
3. Ensure no lint errors: `npm run lint`
4. Stage all changes: `git add .`
5. Commit with conventional format: `git commit -m "feat: descriptive message"`
6. Push to remote: `git push origin <branch-name>`

---

## Quick Reference

**Start Development:**
```bash
npm install          # Install dependencies
npm run start        # Start both frontend and backend
```

**Testing:**
```bash
npm test             # Run all tests
npm run lint         # Check code quality
```

**Workflow:**
1. Pick a failing test or feature
2. Write test (if not exists)
3. See it fail (RED)
4. Implement minimal code (GREEN)
5. Refactor and verify (REFACTOR)
6. Commit with conventional format

**Remember:** Small steps, frequent testing, continuous validation. Work with AI as a collaborative partner, not a replacement for understanding.
