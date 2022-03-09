# PRO_2022

<!-- TODO: A table of contents? -->
## Dev - Starting the project

### Initial setup
Install [virtualbox](https://www.virtualbox.org/wiki/Downloads) with the extension pack

Install [vagrant](https://www.vagrantup.com/downloads)

There is a bit of setup to do the first time you want to run the app.
1. Edit the hosts file of your system (windows `C:\Windows\System32\Drivers\etc\hosts`, linux you should know it ;))
1. Add the following content
   ```
   192.168.56.69   api.our-app.local
   192.168.56.69   our-app.local
   ```

### Start the project
To start the project, simply open a terminal to the `app` directory and run `vagrant up`

Then you can use `vagrant ssh` to ssh into the VM. You have now entered the development environment

### Access
- The backend can be accessed from `api.our-app.local`
- The frontend can be accessed from `our-app.local`
- MailHog can be access from `our-app.local:8025`

### Side note
The URL might change once we have settled for a name. In that case, simply change the entries in the hosts file and access the different parts using the new URLs.

### Git usage (for developer)
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

---
