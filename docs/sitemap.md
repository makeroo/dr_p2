# p2 sitemap

```

welcome page
  -- name declared --> problem creation page

problem creation page
  -- question entered --> problem home

problem home
  -- invite --> invite page

invite page
  -- back --> problem home

```

## Welcome page

This step features no authentication. The first time
a user access this site a user identification cookie will be forged.

The user will be asked to enter her/his name and that's all.

This mechanism is very simple and force the user to use the same browser to continue to discuss a problem.

## Problem creation page

This prototype support the discussion of one problem at a time.

A problem is identified by an URL and can be discussed only knowning it.

A problem is created just entering the question the user want to be discussed.

## Problem home

This is a complex page. In this page a user can:
* enter new solution
* enter new thesis
* create relations
* vote theses and relations
* navigate solutions, theses and relations
* analize solver results
* call for problem closure

## Invite page

Inviting someone to discuss a problem is as simple as to share the problem home page URL.

This page shows a QR code containing such URL,  eg. to
be used with a mobile phone.

# Flowchart

```

<any url>
  url: store it
  uic: has user identification cookie?

no<uic>:
  -->welcome page

welcome page:
   uic: created
   --> has<uic>

has<uic>:
  url: is valid problem url?

invalid<url>:
  problem: created
  --> problem home

valid<url>:
  --> problem home

```
