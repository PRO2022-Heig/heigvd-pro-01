# Quality process

## Git usages

The conventions of message commits and name's branches are difined in the following document: [git.md](git.md)

## Worflow

The workflow will follow the "rules" describes in the following diagram:

![diagram](dev_worflow.png)

## Merge request

### Review

Developpers must make peer-review by adding the other developper of the project (backend or frontend) as Reviewer of the merge request. 
The reviewer will add comments at the merge request if something seems wrong to him.
He can also adds some TODO in the code and commit with a message "Code review".
The quality responsable can also make code review to alleviate developpers.

### Changelog

When creating a merge request, the changes must be spcecified in the [changelog.md](changelog.md) file.

In the file, the developper must add a lign at the begening of the file. The line must contain the date and the commit message containing the Jira key and the description of the change. 
For example, if the backend developpers implement a bugfix on the login the 23 april, one of them will write the following line in the chengelog.md file: `23 April [BUGFIX] {P4-26} Fix backend login`

### Uint tests

With the CI, all unit tests pass before merge a merge request. If at least one test does not pass, the CI will not allow the merge.
The minimum unit tests require to make a merge request is 1 test for each Angular component anr 1 tests for each CRUD request.