# Sirius Evolution Specification: Hadle rename/move of semantic resources

## Preamble

_Summary_: The goal of this evolution is to correctly react to the move or renaming of semantic resources which may be referenced by Sirius sessions.


| Version | Status | Date       | Authors            | Changes           |
|---------|--------|------------|--------------------|-------------------|
|    v0.1 |  DRAFT | 2018-09-05 |   pcdavid, jmallet | Initial version.  |

_Relevant tickets_:

* [Bug 441761 - Support semantic resource renaming from the workspace](https://bugs.eclipse.org/bugs/show_bug.cgi?id=441761)

## Introduction

This section should contain a summary of the proposed evolution, including why it is needed. Ideally it should be self-contained so that non-developers can get a quick overview of the evolution without reading the detailed specification. 

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
