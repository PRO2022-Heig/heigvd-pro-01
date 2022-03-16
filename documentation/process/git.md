# Git usage (for developer)

This document states our git processes.

## Commit message rules

A commit message should look like this: `(?["STATE"]) (?{"ISSUE_KEY"}) "summary"`

With the following "names":

**summary:** A summary line starts with a keyword and a brief summary of what the change does. Make sure to describe how the behavior now is.

**STATE:** (optional, UPPERCASE) To use when the commit does not have a global meaning of "task"  
The state can take **one** of the following values:
  - `[BUGFIX]`: A fix for a bug
  - `[LOGICFIX]`: A fix for a logic problem
  - `[DOCS]`: When adding of editing documentation  

`[WIP]` Can be added **before** an other state to signal that the work is still in progress  
`[FOLLOWUP]` Can be added **before** to signal that it is in relationto the **previous** commit

**ISSUE_KEY:** The "Jira Key" used to link the issues from Jira.

### Examples

- normal: `{DEV-12330} Init Backend`
- with a state: `[BUGFIX] reload db on error`
- with both: `[LOGICFIX] {DEV-12330} Login really works now`
- work in progress `[WIP][LOGICFIX] {DEV-12330} Login really works now`
- followup `[FOLLOWUP][LOGICFIX] {DEV-12330} Login really works now`

## Branch naming

There are 4 main branches on which we normally do not code directly:

- **dev/backend** & **dev/frontend**: Main branches separating the *backend* and the *frontend*, they are equivalent to a **develop** branch for these two parts.
- **develop**: Usually before merging on **main**: A functional code on which is added a set of new features to be tested for validation.
- **main**: Represents a stable production state: All the code works and provides a functional solution.

New branches should look like: `dev/<part>/<name>`.  

Where  
- *\<part\>* is `backend` or `frontend`
- *\<name\>* a meaningful name of the feature/task to develop AND/OR related to a Jira Issue.

For other changes not directly related to code like user documentation this **must** be done on the **documentation** branch and then merged on **main** via a merge request that **must** be validated by quality control


### Usage example

We need to implement a *login method*:  

- `dev/backend/login`: is used on the backend folder.
- `dev/frontend/login`: is used on the frontend folder.
- Once it's done and verified on their branches: merge (request) `dev/backend/login` into `dev/backend` (with probably others branches).
- Same idea with `dev/frontend/login` and `dev/frontend`
- When `dev/backend` and `dev/frontend` are individually verified: merge (request) both into `develop`.  
  Note: In this example both `dev/backend` and `dev/frontend` have new features. It is quite possible that only one of the two is used.
- Verifications of the `develop` branch. Then merge into `main`.



---

## In case of failure in verifications

If the CI fails on a merge request, the merge is not done and the fix has to be done on the unmerged branch.  
If the merge has already been done and a bug is found a `hotfix/<name>` branch is created to fix the issue and a merge request is done on the original branch. Then fix fix is also merged on the lower branch to apply the fix.

Where *\<name\>* is a meaningful name of the hotfix to implement AND related to a Jira Issue.
