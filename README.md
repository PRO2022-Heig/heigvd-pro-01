# PRO_2022

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
- ISSUE_KEY: The "Jira Key" used to link the issues from Jira

##### Examples
- normal: `Init Backend`
- with a state: `[BUGFIX] reload db on error`
- with an ISSUE_KEY: `{DEV-12330} Auth login with Google`
- with both: `[LOGIC_FIX] {DEV-12330} Login now realy works`
