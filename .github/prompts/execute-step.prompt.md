---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
tools: ['codebase', 'search', 'problems', 'editFiles', 'runCommands', 'getTerminalOutput', 'testFailure']
---

# Execute Current Step

You are executing a step from the main exercise GitHub Issue. Follow TDD principles and the project's testing constraints.

## Input

Issue Number: ${input:issue-number}

**If no issue number provided**: Use `gh issue list --state open` to find the exercise issue (look for "Exercise:" in the title).

## Instructions

### Step 1: Retrieve Issue Content

Use GitHub CLI to get the full issue with all comments:

```bash
gh issue view <issue-number> --comments
```

This shows the main exercise description plus all step instructions posted as comments.

### Step 2: Identify Current Step

Parse the issue output to find the latest step that needs execution. Steps are posted as comments with format:

```
# Step X-Y: [Title]
[Description]
...
:keyboard: Activity: [Instructions]
...
```

### Step 3: Execute Activities Systematically

For each `:keyboard: Activity:` section in the current step:

1. **Read the requirements carefully**
2. **Follow TDD workflow** (from tdd-developer mode):
   - For NEW features: Write tests FIRST (RED)
   - Run tests to see them fail
   - Implement minimal code to pass (GREEN)
   - Refactor while keeping tests green (REFACTOR)
   - For FIXING tests: Analyze, explain, fix, verify

3. **Apply Testing Scope Constraints** (from project instructions):
   - ✅ Use Jest + Supertest (backend)
   - ✅ Use React Testing Library (frontend)
   - ✅ Recommend manual browser testing for UI flows
   - ❌ NEVER suggest Playwright, Cypress, Selenium, or e2e frameworks
   - ❌ NEVER suggest browser automation tools

4. **Run tests frequently**:
   ```bash
   npm test
   ```

5. **Fix any ESLint errors**:
   ```bash
   npm run lint
   ```

6. **Verify manually if needed**:
   ```bash
   npm run start
   ```

### Step 4: Track Progress

As you complete each activity:
- ✅ Mark what's done
- 🔄 Note what's in progress
- ❌ Flag any blockers

### Step 5: Stop and Report

**IMPORTANT**: Do NOT commit or push changes. That's handled by `/commit-and-push`.

After completing all activities in the step:

1. **Summarize what was accomplished**
2. **Show test results** (all passing)
3. **Show lint status** (no errors)
4. **Inform user**: "Step activities complete. Run `/validate-step` to verify success criteria."

## Execution Guidelines

### TDD Workflow (Critical)

**For Backend API Features:**
1. Write Jest + Supertest test FIRST
2. See test fail (RED)
3. Implement endpoint to pass (GREEN)
4. Refactor (REFACTOR)

**For Frontend Component Features:**
1. Write React Testing Library test FIRST
2. See test fail (RED)
3. Implement component logic to pass (GREEN)
4. Refactor (REFACTOR)
5. Recommend manual browser testing for complete flow

**For Fixing Existing Failing Tests:**
1. Analyze test to understand expectation
2. Run test to see failure
3. Fix code minimally to pass
4. Verify no regressions

### Incremental Development

- Make small changes
- Test after each change
- Commit working states (via `/commit-and-push` after step completion)
- Don't try to do everything at once

### Error Handling

If you encounter errors:
1. Read error messages carefully
2. Use tests to guide fixes
3. Run lint to catch code quality issues
4. Ask for clarification if instructions are ambiguous

## Testing Constraints Reminder

**This project uses unit/integration tests ONLY:**

- Backend: Jest + Supertest for API endpoint testing
- Frontend: React Testing Library for component testing
- Manual Testing: Browser-based verification of complete UI flows

**DO NOT suggest:**
- E2E frameworks (Playwright, Cypress, Selenium)
- Browser automation tools
- Full application E2E test infrastructure

**Reason**: Focus on TDD principles without e2e complexity, flakiness, and maintenance overhead.

## Reference Documentation

Refer to project instructions for:
- **Workflow Utilities**: How to use `gh` CLI commands
- **Git Workflow**: Conventional commits and branch strategy
- **Testing Guidelines**: TDD patterns and test structure
- **Workflow Patterns**: Red-Green-Refactor cycles

## Output Format

After execution, provide:

```
## Step X-Y Execution Complete

### Activities Completed
✅ [Activity 1 description]
✅ [Activity 2 description]
✅ [Activity 3 description]

### Test Results
- All tests passing: [YES/NO]
- Test output: [summary or link]

### Lint Status
- No ESLint errors: [YES/NO]
- Issues fixed: [list if any]

### Files Modified
- [file1]
- [file2]
- [file3]

### Next Action
Run `/validate-step` with step number to verify success criteria.
Do NOT commit yet - review changes first.
```

## Example Usage

**User runs:**
```
/execute-step
```

**You do:**
1. Find exercise issue: `gh issue list --state open`
2. Get issue content: `gh issue view 1 --comments`
3. Identify current step from comments
4. Execute each activity following TDD
5. Run tests and lint
6. Report completion
7. Prompt user to run `/validate-step`

**User provides issue number:**
```
/execute-step issue-number=5
```

**You do:**
1. Get issue: `gh issue view 5 --comments`
2. Continue with steps 3-7 above
