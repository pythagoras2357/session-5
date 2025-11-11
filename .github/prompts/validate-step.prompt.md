---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
tools: ['codebase', 'problems', 'runCommands', 'getTerminalOutput']
---

# Validate Step Completion

You are validating that all success criteria for a specific exercise step have been met. Perform systematic checks and provide clear pass/fail status with actionable guidance.

## Input

Step Number: ${input:step-number}

**REQUIRED**: Step number must be provided in format "X-Y" (e.g., "5-0", "5-1", "5-2").

Example: `/validate-step step-number=5-0`

## Instructions

### Step 1: Retrieve Exercise Issue

Use GitHub CLI to find and retrieve the main exercise issue:

```bash
# List open issues to find the exercise (look for "Exercise:" in title)
gh issue list --state open

# Get the full issue with all step comments
gh issue view <issue-number> --comments
```

### Step 2: Locate Target Step

Search through the issue comments to find the specific step:

```
# Step ${input:step-number}: [Step Title]
```

Extract the full step content, particularly the **Success Criteria** section.

### Step 3: Extract Success Criteria

The step will have a section like:

```
## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
...
```

Parse each criterion to understand what needs validation.

### Step 4: Validate Each Criterion

For each success criterion, systematically check:

#### Code-Related Criteria

**Example**: "POST endpoint returns 201 and creates todo"
- Check if endpoint exists in code
- Run relevant tests: `npm test -- --testNamePattern="POST"`
- Verify implementation matches requirement

**Example**: "All tests pass"
- Run full test suite: `npm test`
- Check exit code and output
- Report any failures

**Example**: "No ESLint errors"
- Run linter: `npm run lint`
- Check for any errors or warnings
- List any issues found

#### File/Structure Criteria

**Example**: "File `app.js` contains DELETE endpoint"
- Search codebase for the endpoint
- Verify correct implementation
- Check for proper error handling

#### Functional Criteria

**Example**: "Application starts without errors"
- Attempt to start: `npm run start` (in background if possible)
- Check for startup errors
- Verify server is listening

**Example**: "Todos can be created, updated, and deleted"
- Run integration tests
- Check manual test results if available
- Verify CRUD operations work

### Step 5: Generate Validation Report

Create a comprehensive report showing:
- ✅ Criteria that PASS (fully met)
- ⚠️ Criteria that PARTIALLY pass (mostly met, minor issues)
- ❌ Criteria that FAIL (not met, needs work)

For each failing criterion, provide:
1. **What's missing**: Specific gap or issue
2. **How to fix**: Actionable next steps
3. **Command to verify**: How to check when fixed

### Step 6: Overall Status

Determine overall step completion:
- **COMPLETE** ✅: All criteria pass
- **INCOMPLETE** ⚠️: Some criteria fail
- **BLOCKED** ❌: Critical criteria fail, cannot proceed

## Validation Checks

### Standard Checks (Always Perform)

1. **Test Suite Status**
   ```bash
   npm test
   ```
   - All tests passing?
   - Any test failures?
   - Any tests skipped?

2. **Lint Status**
   ```bash
   npm run lint
   ```
   - No ESLint errors?
   - No warnings?
   - Code quality clean?

3. **Build Status** (if applicable)
   ```bash
   npm run build
   ```
   - Builds successfully?
   - No compilation errors?

4. **File Structure**
   - Required files exist?
   - Files in correct locations?
   - Proper imports/exports?

### Step-Specific Checks

Based on the step's success criteria, perform targeted checks:

**For API Endpoint Steps:**
- Endpoint exists in routing
- Proper HTTP method
- Correct request/response handling
- Error handling implemented
- Tests cover happy path and errors

**For Frontend Component Steps:**
- Component file exists
- Component renders correctly
- Event handlers implemented
- State management working
- Tests cover user interactions

**For Bug Fix Steps:**
- Previously failing test now passes
- Root cause addressed
- No new regressions introduced
- Edge cases handled

**For Refactoring Steps:**
- All tests still pass
- Code quality improved
- No functionality broken
- Lint errors resolved

## Output Format

Provide a detailed validation report:

```
## Step ${input:step-number} Validation Report

### Overview
- Step Title: [Title from issue]
- Total Criteria: [N]
- Passing: [X] ✅
- Failing: [Y] ❌
- Status: [COMPLETE/INCOMPLETE/BLOCKED]

### Detailed Results

#### ✅ Passing Criteria

**Criterion 1**: [Description]
- Status: PASS ✅
- Evidence: [What was checked]
- Result: [Specific findings]

#### ❌ Failing Criteria

**Criterion 2**: [Description]
- Status: FAIL ❌
- Issue: [What's wrong]
- Fix: [How to resolve]
- Verify: [Command to check]

**Criterion 3**: [Description]
- Status: FAIL ❌
- Issue: [What's wrong]
- Fix: [How to resolve]
- Verify: [Command to check]

### Test Results
```
[Test output or summary]
```

### Lint Results
```
[Lint output or summary]
```

### Next Steps

**If COMPLETE** ✅:
1. Review changes one final time
2. Run `/commit-and-push branch-name=<branch>` to commit
3. Move to next step with `/execute-step`

**If INCOMPLETE** ⚠️:
1. Address failing criteria listed above
2. Run validation again: `/validate-step step-number=${input:step-number}`
3. Commit when all criteria pass

**If BLOCKED** ❌:
1. Critical issues must be resolved first
2. Review the "Fix" guidance for each failure
3. Ask for help if stuck
```

## Error Handling

**If step number not provided:**
```
❌ Step number is required.

Usage: /validate-step step-number=X-Y

Examples:
- /validate-step step-number=5-0
- /validate-step step-number=5-1
- /validate-step step-number=5-2
```

**If step not found in issue:**
```
❌ Step ${input:step-number} not found in the exercise issue.

Available steps:
[List steps found in the issue]

Please provide a valid step number.
```

**If issue not found:**
```
❌ Could not find exercise issue.

Run: gh issue list --state open

Look for an issue with "Exercise:" in the title.
```

## Example Usage

**User runs:**
```
/validate-step step-number=5-0
```

**You do:**
1. Find exercise issue: `gh issue list --state open`
2. Get issue with comments: `gh issue view <N> --comments`
3. Search for "# Step 5-0:" in the output
4. Extract success criteria from that step
5. Run systematic checks:
   - `npm test`
   - `npm run lint`
   - Check specific criteria from the step
6. Generate detailed validation report
7. Provide clear next steps based on results

**Example Report:**
```
## Step 5-0 Validation Report

### Overview
- Step Title: Initialize Backend with Tests
- Total Criteria: 4
- Passing: 3 ✅
- Failing: 1 ❌
- Status: INCOMPLETE ⚠️

### Detailed Results

#### ✅ Passing Criteria

**All tests pass**: PASS ✅
- Ran: `npm test`
- Result: 12/12 tests passing

**No ESLint errors**: PASS ✅
- Ran: `npm run lint`
- Result: No errors or warnings

**Backend starts successfully**: PASS ✅
- Ran: `npm run start`
- Result: Server listening on port 3001

#### ❌ Failing Criteria

**POST endpoint creates todos**: FAIL ❌
- Issue: Endpoint returns 501 "Not implemented"
- Fix: Implement the POST handler in app.js
- Verify: `npm test -- --testNamePattern="should create a new todo"`

### Next Steps
1. Implement POST endpoint handler
2. Run validation again: `/validate-step step-number=5-0`
3. Commit when complete: `/commit-and-push branch-name=feature/post-endpoint`
```

## Reference

See **Workflow Utilities** section in `.github/copilot-instructions.md` for:
- GitHub CLI command patterns
- Issue structure and format
- Step numbering conventions
