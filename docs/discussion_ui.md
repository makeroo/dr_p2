# Introduction

In order to discuss a problem we need to:

1. read the question

2. review proposed solutions and propose new ones

3. put thoughts (thesis) on the table

4. create relations between them

Creating relations is a n^2 problem: we have to confront
each couple of thesis to see if they contradicts each other, if one supports the other or vice versa or if they
are unrelated.

5. Vote

From the user point of view voting is very much like
creating relations or content. Whether I read something or write something, I evaluate it, though there can be some bias whether I'm the author or not.

Differences between voting and creating content from the system point of view:

 * voting can be modified or even revoked, while content
   not;

 * content is the same for every user, while voting not:
   every user express her/his vote.

These differences affects problem evaluation and decision
making process so the user *has* to be aware of it.

When the user see content it should see voting too to and be aware of it:

 * content should be as more visible as more voted it is

   * light tint -> rejected

   * darker shades of tint -> accepted

     the greater up/down votes ratio the darker

 * the tint should show if the user vote is aligned to
   the overall votes or not

   eg. *purple*: disaccord, the user voted contrary to the
               majority of the others

     *green*: accord, the user voted accordinglu to the
               majority of the others

     *black*: the user did not express a vote

## Exploration

Back to previous point 4: examine and create relations between theses.

Use cases:

 * examine new content

   The user should be able to organize new content.
   Typical workflow: select an "unread" thesis, search
   and confront to the other "read" ones.

 * analyze own evaluation: trace own inconsistencies

   The user select an inconsistency, explore the path it comprises of. She/he can either revoke an upvote 
   thus eliminating the inconsistency or downvote some
   of its elements if she/he thinks to be right.

 * have a look about how the discussion is going on

   Select a thesis and see which theses it supports,
   which theses are supporting it, which are in
   contradiction.

## Examining new content

"Pin" a thesis, that is keep it visible while searching for others.

Search criteria:

 * content

   Free text search.

 * tags

   Let the user classify theses by her/his own criteria.

 * votes

   Not useful.

The user then select the second thesis to create a support or contradiction relationship.

## Analyzing own reputation

