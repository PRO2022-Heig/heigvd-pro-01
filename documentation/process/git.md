### Git usage (for developer)

This document states our git processes

#### Commit nomenclature

A Commit message should look like this: `(?["STATE"]) (?{"ISSUE_KEY"}) "text"`

With the following "names":

- text: The normal commit message. What have been done
- STATE: (optional, UPPERCASE) To use when the commit does not have a global meaning of "task".  
  For example: [WIP], [BUGFIX], [LOGIC_FIX], ...
- ISSUE_KEY: The "Jira Key" used to link the issues from Jira.

##### Examples

- normal: `Init Backend`
- with a state: `[BUGFIX] reload db on error`
- with an ISSUE_KEY: `{DEV-12330} Auth login with Google`
- with both: `[LOGIC_FIX] {DEV-12330} Login really works now`

#### Branch nomenclature

There are 4 main branches on which we normally do not code directly:
<!-- TODO: dev or develop? Or nothing? -->

- **dev/backend** & **dev/frontend**: Main branches separating the *backend* and the *frontend*, they are equivalent to a **develop** branch for these two parts.
- **develop**: Usually before merging on **main**: A functional code on which is added a set of new features to be tested for validation.
- **main**: Represents a stable production state: All the code works and provides a functional solution.

New branches should look like: `dev/<part>/<name>`.  
Where

- *\<part\>* is `backend` or `frontend`
- *\<name\>* a meaningful name of the feature/task to develop AND/OR related to a Jira Issue.

<!-- TODO: better title -->

##### Example of usage

<!-- TODO: to develop, fix, modify, it seems logical to me when I wrote this, but it can be improved -->
We need to implement a *login method*:  

- `dev/backend/login`: is used on the backend folder.
- `dev/frontend/login`: is used on the frontend folder.
- Once it's done and verified on their branches: merge (request) `dev/backend/login` into `dev/backend` (with probably others branches).
- Same idea with `dev/frontend/login` and `dev/frontend`
- When `dev/backend` and `dev/frontend` are individually verified: merge (request) both into `develop`.  
  Note: In this example both `dev/backend` and `dev/frontend` have new features. It is quite possible that only one of the two is used.
- Verifications of the `develop` branch. Then merge into `main`.



---

**In case of failure in verifications**

If the CI fails on a merge request, the merge is not done and the fix has to be done on the unmerged branch.  
If the merge is done (not a merge request, merge request but error(s) not detected or manual merge):

- the errors can be fixed with a [QUICK_FIX]/[HOTFIX] state on the merged branch if it is done quickly and simply.
- Else (the merge is "undone" and) the fix is done on the original branch or a "hotfix" branch