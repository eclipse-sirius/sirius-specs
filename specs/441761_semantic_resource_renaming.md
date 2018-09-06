# Sirius Evolution: Handle rename/move of semantic resources

## Preamble

_Summary_: The goal of this evolution is to correctly react to the move or renaming of semantic resources which may be referenced by Sirius sessions.


| Version | Status | Date       | Authors            | Changes           |
|---------|--------|------------|--------------------|-------------------|
|    v0.1 |  DRAFT | 2018-09-05 |   pcdavid, jmallet | Initial version.  |

_Relevant tickets_:

* [Bug 441761 - Support semantic resource renaming from the workspace](https://bugs.eclipse.org/bugs/show_bug.cgi?id=441761)

## Introduction

The goal is to automatically adjust Sirius model files present in the workspace (`.aird` and `.srm` models) when a semantic resource they reference is renamed or moved by the user. Currently, when a Sirius model `representations.aird` references for example a semantic model `a.ecore`, it stores these references as URIs. If the end-user moves or renames the file into `b.ecore`, all these references are broken. The objective of this evolution is to correctly detect these situations and update the Sirius models which contain references to the old obsolete path to point to the new one.

Some initial remarks and open questions:
* We will only support file moves/renaming which are performed directly through the Eclipse workspace. If the end user moves of renames the files using direct file-system operations outside of Eclipse, we will not do anything more than currently.
* We will only consider the impact on Sirius's own files at the moment (i.e. `.aird` and `.srm` models). Semantic models can have references between themselves, and ideally they should be adjusted too, but this is not part of the initial scope of this ticket. Depending on how things unfold, we may try to support this in the future.
* We will only consider files inside opened projects. If a project in the workspace is currently closed, we will not open it to look inside.
* While this is not strictly in the scope of the ticket, we should if possible also support the move/renaming of Sirius's own files, for example when renaming an `aird` fragment.
* Should we handle the deletion of semantic model files, and how?
* The reliability of the changes is a major concern. Under no circumstances should the changes we make break the Sirius models. More precisely, we should not break them more than the current situation of doing nothing does.

## Detailed Specification

This section contains the "meat" of the document. Its structure will depend on the evolution itself, but it should contain:

* a clear description of the objective, i.e. why the evolution is needed.
* a justification of the approach chosen. If other approaches were considered and rejected, document it for future reference.
* limits: things that are out of the scope of the evolution.

## Backward Compatibility and Migration Paths

Every one of the sections below should be present. Even if there is no corresponding change (for example no API change), it should exist to mention explicitly "This evolution does not change any API."

### Metamodel Changes

Document any change to the Sirius metamodel. If they require a migration operation, mention it and describe the general idea of how migration process. If any information can be lost during the migration, mention it clearly. If validation rules must be added/modified, mention it also.
  
### API Changes

List every API addition, removal and deprecation. For each removal and deprecation, indicate the migration path for existing code. If you plan to depcrecate an existing API, it is your responsibility to update all our existing code to use the alternative you provide; take this into account in the estimation for the task.

Be careful when designing new APIs to provide all the appropriate "hooks" for users to customize the feature's behavior. In particular, think carefully about which of the methods you provide should be @protected@ instead of @private@ so that users can override some of the default behavior. Do no hesitate to discuss this wth the users  who requested the feature to make sure he will be able to implement the customizations he needs.

### User Interface Changes

List every user-visible change in the interface. Here "user" includes not only end-users but also specifiers which use the VSM editor.

### Documentation Changes

List every documentation needing an update here, starting by the New and Noteworthy documentation.

## Tests and Non-regression strategy

This part of the document should describe the strategy to use to correctly test the evolution and guarantee the non-regression.  

## Implementation choices and tradeoffs

Any important tradeoff or choice made during the implementation should be referenced here with pros/cons leading to the final decision.
