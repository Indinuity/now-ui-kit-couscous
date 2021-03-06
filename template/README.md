# Now UI Kit Template for Couscous by Indinuity

## Usage

To use the template, set it up in your `couscous.yml` configuration file:

```yaml
templateUrl: https://github.com/Indinuity/now-ui-kit-couscous/template
```

## Configuration

Here are all the variables you can set in your `couscous.yml`:

```yaml
template:
    # Base URL of the published website
    baseUrl: http://mnapoli.github.io/Couscous
 
    github:
        user: indinuity
        repo: now-ui-kit-couscous

    title: Now-UI-Kit Couscous Template
    subTitle: An Example Template by Indinuity.

    # The left menu bar
    menu:
        sections:
            main:
                name: Main documentation
                items:
                    home:
                        text: Home page
                        # You can use relative urls
                        relativeUrl: doc/faq.html
                    foo:
                        text: Another link
                        # Or absolute urls
                        absoluteUrl: https://example.com
            other:
                name: Other topics
                items:

```

Note that the menu items can also contain HTML:

```yaml
home:
    text: '<i class="fa fa-github"></i> Home page'
    relativeUrl: doc/faq.html
```

## Menu

To set the current menu item (i.e. highlighted menu item), set the `currentMenu` and `currentSection` keys in the Markdown files:

```markdown
---
currentSection: main
currentMenu: home
---

# Welcome
```
