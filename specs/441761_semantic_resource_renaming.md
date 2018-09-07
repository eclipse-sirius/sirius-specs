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
* The reliability of the changes is a major concern. Under no circumstances should the changes we make break the Sirius models. More precisely, we should not break them more than the current situation of doing nothing does. We may decide to make the feature disabled by default ("opt-in") in the first released version if we're not completely confident. One risk mitigation strategy to evaluate would be to make the changes on Sirius model files in a way that can be reverted using the standard Eclipse local history in case of problem.

## Detailed Specification

## Description 

The goal of this new feature is to update Sirius models after rename or move semantic resource from the workspace. For now, rename is effective but induce proxies creation in Sirius models. That is why this new feature is major for user who want to rename their semantic resources without broken Sirius models.

In a first part , this support is focused on Sirius models (i.e. `.aird` and `.srm` models) to simplify implementation and reduce complexity. In these models, proxies should be repaired after URI changes of object due to semantic resource rename or move. Semantic resource attached to Sirius models should also be update in order to referenced new semantic resource.

Semantic resource rename or move is only support from workspace. 

## Scope

The main difficulty is to clarify the scope of this feature :
* open/closed project,
* modeling/no modeling project,
* load/unload session,
* dirty/clean session.

According to the defined scope, a popup can appear in order to give choice to user to close/save session before rename to avoid errors during rename process. 

## Approach

In order to rename semantic resource, an extension point _org.eclipse.ltk.core.refactoring.renameParticipants_ can be used. This extension will be configured with a new class that provides the participant implementation required for rename. For moving semantic resource, an other extension point _org.eclipse.ltk.core.refactoring.moveParticipants_ is available.

In these participant classes, two different approaches can be used to make this feature possible.

* The first one is to read/browse Sirius model file and replace all occurences of the semantic resource before rename by the new name. Then you just have to save the resource. The main drawback of this approach is the use of some semantic resource with the same name but not localized in the same place. So risk is that you replace occurences of semantic resource with the same name but not concerned by the rename process.   

* The second one is to load Sirius resource and collect all proxies. Then you set proxies URI with the new URI of semantic resource renamed. Finally, you save the resource. The main drawback of this second approach is time. Indeed loading resource to collect proxies can be extremely time consuming. 

In both case, we need a new service which is the angular stone of this feature. Indeed these approach can be executed only if we know which Sirius models are impacted by the rename of semantic resource. 
A first work will consist to create this service which verify if a Sirius model reference the semantic resource in the process of rename. Thanks to the new service, we will be able to determine which Sirius models reference A semantic resource when I rename A into B.

## Backward Compatibility and Migration Paths

This evolution may add new APIs but should not create any backward compatibility.

### Metamodel Changes

No metamodel change should be necessary.
  
### API Changes

No change on existing API.

A new API will be added and correspond to the service describe in the Approach part. This new API will determine if Sirius model referenced a given semantic resource.

### User Interface Changes

No significant user interface changes. A popup can appears to propose user to close/save resources before rename.

### Documentation Changes

* This new Rename feature will be documented.
* New Api to know dependence of Sirius models with semantic resource wiil appears in release notes.

## Tests and Non-regression strategy

JUNIT tests should be add to test the new API :
* with Sirius model null,
* with Sirius model without semantic resource referenced,
* with Sirius model with semantic resource referenced but not the given semantic resource,
* with Sirius model with semantic resource referenced and the given semantic resource,

JUNIT test should also be add to test the rename feature after specified the scope.  

## Implementation choices and tradeoffs

Any important tradeoff or choice made during the implementation should be referenced here with pros/cons leading to the final decision.
