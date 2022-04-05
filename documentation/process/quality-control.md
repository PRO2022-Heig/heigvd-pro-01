# Quality process

## Git usages

The conventions of message commits and name's branches are defined in the following document: [git.md](git.md)

## Code usage

The backend and frontend teams use linters for their technology stack to ensure that the respective code standards and conventions are implemented by the developers when writing new code or updating existing lines.

The backend script is based on the PSR12 convention for PHP : [https://www.php-fig.org/psr/psr-12/](https://www.php-fig.org/psr/psr-12/)

The frontend script in based on the ESlint rules for TypeScript : [https://eslint.org/docs/rules/](https://eslint.org/docs/rules/) 

## Worflow

The workflow will follow the "rules" describes in the following diagram:

![diagram](dev_workflow.jpg)

As describe in the diagram, at the end of a sprint, the quality manager and the project manager will make manual functional tests and for every bugs detected, a Jira task will be created to fix the bug. Those functional tests will follow a document where all tests manipulations are described with the excepted behavior. This document will be modified to add the information of wich test passed and wich did not pass. Before every sprint end, each test is run all at once.

## Merge request

### Review

Code reviews are made using peer-review methodology. Their exchanges are made on the merge request itself. The merge request won't be merged until agreement and all conversations resolutions. In the case where their opinions cannot converge an external mediator will decide which solution is best.

### Changelog

When creating a merge request, the changes must be spcecified in the [changelog.md](changelog.md) file.

The developper must add a line at the beginning of the file. The line must contain the date and the description of the change. 
For example, if a bugfix on the login is fixed the 23 april, a developer will write the following line in the changelog.md file: 

`23 April [BUGFIX] Fix login`

### Tests

With the CI, all unit tests pass before merge a merge request. If at least one test does not pass, the CI will not allow the merge.
Backend and frontend unit tests will be done with Synfony and Jasmin framework respectively.

### Code coverage

To have a minimum guarantee that the code is tested, we would try to have a minimum code coverage. However, as the backend and the frontend are not in the same language, the code coverage will be defined separately.

For the backend, the minimum code coverage is 80% for the classes and the methods.

For the frontend, the minimum code coverage is 30% for the functions, because a lot of frontend code does not implement logic. 

The code coverage must be satified for each merge request otherwise, the CI will not allow the merge.
