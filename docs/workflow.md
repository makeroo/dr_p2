# Roles

* community

  Who can partecipate to the discussion.
  A problem can be either public, accessible by all the communities, or private.

* editors

  Theses and solutions proposal reviewers.
  There can be community editors or problem editors.

* community managers

  Edit community name, description, aim and other data.

* problem managers

  They constitute the problem committee. Not every problem have a specific committee.

 * problems committee

   Who decides which problem are worth discussing or not.

# Workflow notation

The workflow is described as a FSM.

FSM description comprises of a list of states along with
their outgoing transitions.

Example:
```
STATE NAME
  -- EVENT NAME --> STATE NAME
  ...
```

A state can have multiple transitions. Transitions are defined listed below state name.

The first state is the starting one.

# Problem workflow

```
Problem draft
  -- modified --> problem draft
  -- edited --> problem proposal

Problem proposal
  -- accepted --> problem
  -- rejected --> problem draft
```

Who evaluates a problem proposal?

* the **community**: all problem proposals are visible,
  every member of a community can accept a proposal
  or reject it with a comment.

  When a certain threshold is reached the proposal is
  accepted.

* the **problems committee**, if the community have one.

```
Problem
  -- discussed --> problem
  -- solved --> closed problem
```

Who decides that a problem is solved?

* **time** A deadline is specified.

* **activity** When there is not discussion for a certain interval the problem is closed.

* **acclamation** Partecipants to the discussion vote
  to close the problem.

Methods can be combined. Example: you can have time and activity, meaning that if the activity increases when the deadline is reached then the deadline can be postponed (up to a certain point though).

The closing method can be choosed by:
* circumstances and contingencies
* the proposer
* the problem committee

# Solution and thesis workflow

```
Solution proposal draft
  -- modified --> solution proposal draft
  -- edited --> solution proposal
  -- delete --> closed


Solution proposal
  -- accepted -- > solution
  -- rejected:
     -- suggested duplicate --> solution proposal draft
     -- suggested editing --> solution proposal draft
     -- not a solution
        or any other motivation --> solution proposal draft

Thesis proposal draft
  -- modified --> thesis proposal draft
  -- edited --> thesis proposal
  -- delete --> closed


Thesis proposal
  -- accepted -- > thesis
  -- rejected:
     -- suggested split --> thesis proposal draft
     -- suggested duplicate --> thesis proposal draft
     -- suggested editing --> thesis proposal draft
     -- not a thesis
        or any other motivation --> thesis proposal draft
```

Discussion and activity

What | Is Activity?
-----|-------------
vote | no
new solution | yes
new thesis | yes
new relation | yes
relation is accepted or rejected | yes
thesis is accepted or rejected | yes
best solution changed | yes

In this context accepted and rejected identifies the event when a thesis or relation votes ratio changes.
That is the change from #downvotes >= #upvotes or viceversa.

The rationale is that we grant users time to analyze every change that is relevant to them.
