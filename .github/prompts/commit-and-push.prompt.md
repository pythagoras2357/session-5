---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['runCommands', 'getTerminalOutput']
---

# Commit and Push Changes

You are committing staged work to a feature branch using conventional commit format and proper Git workflow.

## Input

Branch Name: ${input:branch-name}

**REQUIRED**: If no branch name is provided, ask the user to specify the feature branch name.

Example branch names:
- `feature/delete-endpoint`
- `feature/edit-todo-ui`
- `fix/toggle-bug`
- `test/add-validation-tests`

## Instructions

### Step 1: Analyze Changes

Review what has changed in the working directory:

```bash
git status
git diff
```

Understand:
- Which files were modified
- What functionality was added/changed/fixed
- Whether this is a feature, fix, test, refactor, or chore

### Step 2: Generate Commit Message

Follow **Conventional Commit** format (from project Git Workflow):

```
<type>: <description>

[optional body]
```

**Types:**
- `feat:` - New feature (e.g., `feat: add delete todo endpoint`)
- `fix:` - Bug fix (e.g., `fix: toggle bug in PATCH endpoint`)
- `test:` - Adding or updating tests (e.g., `test: add validation tests for POST`)
- `refactor:` - Code refactoring (e.g., `refactor: simplify error handling`)
- `docs:` - Documentation changes (e.g., `docs: update testing guidelines`)
- `chore:` - Maintenance tasks (e.g., `chore: fix ESLint warnings`)
- `style:` - Code style changes (e.g., `style: format with prettier`)

**Guidelines:**
- Use present tense ("add" not "added")
- Don't capitalize first letter
- No period at the end
- Keep description concise (50 chars or less)
- Add body for complex changes (optional)

**Examples:**
```
feat: implement POST /api/todos endpoint
fix: correct toggle logic in PATCH endpoint
test: add comprehensive DELETE endpoint tests
refactor: extract validation into helper functions
chore: remove unused imports and console.log statements
```

### Step 3: Verify Branch Name

Ensure branch name follows project conventions:
- `feature/<descriptive-name>` - For new features
- `fix/<descriptive-name>` - For bug fixes
- `test/<descriptive-name>` - For test additions
- `refactor/<descriptive-name>` - For refactoring

### Step 4: Create or Switch to Branch

**Check if branch exists:**
```bash
git branch --list ${input:branch-name}
```

**If branch doesn't exist:**
```bash
git checkout -b ${input:branch-name}
```

**If branch exists:**
```bash
git checkout ${input:branch-name}
```

### Step 5: Stage All Changes

```bash
git add .
```

### Step 6: Commit with Generated Message

```bash
git commit -m "<generated-commit-message>"
```

### Step 7: Push to Remote

```bash
git push origin ${input:branch-name}
```

If this is the first push to this branch, Git may suggest setting upstream:
```bash
git push --set-upstream origin ${input:branch-name}
```

### Step 8: Report Results

Show:
- Branch name used
- Commit message generated
- Files committed
- Push status

## Safety Checks

**BEFORE committing:**
- [ ] Verify all tests pass: `npm test`
- [ ] Verify no lint errors: `npm run lint`
- [ ] Review git diff to ensure only intended changes
- [ ] Confirm branch name is correct (NOT main)

**CRITICAL**: 
- ❌ NEVER commit directly to `main`
- ❌ NEVER push to `main`
- ✅ ALWAYS use the user-provided feature branch name
- ✅ ALWAYS use conventional commit format

## Error Handling

**If tests fail:**
```
⚠️  Tests are failing. Cannot commit broken code.

Run `npm test` to see failures, fix them first, then try again.
```

**If lint errors exist:**
```
⚠️  ESLint errors detected. Fix quality issues before committing.

Run `npm run lint` to see errors, fix them, then try again.
```

**If branch is main:**
```
❌ Cannot commit to main branch directly.

Please provide a feature branch name:
- feature/<name> for new features
- fix/<name> for bug fixes
- test/<name> for test additions
```

**If no branch name provided:**
```
❌ Branch name is required.

Please specify a feature branch name. Examples:
- feature/delete-endpoint
- fix/toggle-bug
- test/validation-tests

Run: /commit-and-push branch-name=<your-branch-name>
```

## Output Format

After successful commit and push:

```
## ✅ Changes Committed and Pushed

**Branch**: ${input:branch-name}

**Commit Message**: 
`<generated-commit-message>`

**Files Committed**:
- file1
- file2
- file3

**Commit Hash**: <hash>

**Push Status**: ✅ Successfully pushed to origin/${input:branch-name}

### Next Steps
- Verify changes on GitHub
- Create Pull Request if ready to merge
- Continue with next development task
```

## Example Usage

**User runs:**
```
/commit-and-push branch-name=feature/delete-endpoint
```

**You do:**
1. Check current branch: `git branch`
2. Analyze changes: `git diff`, `git status`
3. Generate commit message: `feat: implement DELETE /api/todos/:id endpoint`
4. Safety checks: Run tests and lint
5. Create/switch to branch: `git checkout -b feature/delete-endpoint`
6. Stage changes: `git add .`
7. Commit: `git commit -m "feat: implement DELETE /api/todos/:id endpoint"`
8. Push: `git push origin feature/delete-endpoint`
9. Report success with details

**User runs without branch name:**
```
/commit-and-push
```

**You respond:**
```
Branch name is required. Please specify:

Examples:
- feature/delete-endpoint
- fix/toggle-bug
- test/validation-tests

Usage: /commit-and-push branch-name=<your-branch-name>
```

## Reference

See **Git Workflow** section in `.github/copilot-instructions.md` for:
- Conventional commit format details
- Branch naming conventions
- Git command patterns
- Commit workflow steps
