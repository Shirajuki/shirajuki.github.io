---
title: 'Markdown cheatsheet'
date: '2022-08-15'
category: 'docs'
tags:
  - 'md'
---

## Text Writing

It is easy to write in GFMD. Just write simply like text and use the below simple "tagging" to mark the text and you are good to go!

To specify a paragraph, leave 2 spaces at the end of the line

## Headings

```
# Sample H1
## Sample H2
### Sample H3
```

will produce

# Sample H1

## Sample H2

### Sample H3

---

## Horizontal Rules

Horizontal rule is created using `---` on a line by itself.

---

## Coding - Block

````
```ruby
# The Greeter class
class Greeter
  def initialize(name)
    @name = name.capitalize
  end

  def salute
    puts "Hello #{@name}!"
  end
end

# Create a new object
g = Greeter.new("world")

# Output "Hello World!"
g.salute
```
````

will produce

```ruby
# The Greeter class
class Greeter
  def initialize(name)
    @name = name.capitalize
  end

  def salute
    puts "Hello #{@name}!"
  end
end

# Create a new object
g = Greeter.new("world")

# Output "Hello World!"
g.salute
```

Note: You can specify the different syntax highlighting based on the coding language eg. ruby, sh (for shell), php, etc  
Note: You must leave a blank line before the ` ``` `

## Coding - In-line

You can produce inline-code by enclosing the code with ` `` `

```
This is some code: `echo something`
```

will produce

This is some code: `echo something`

---

## Text Formatting

**Bold Text** is done using `**Bold Text**`  
_Italic Text_ is done using `*Italic Text*`

---

## Hyperlinks

- mdsvex will automatically detect URL and convert them to links like this http://www.futureworkz.com
- To specify a link on a text, do this:

```
This is [an example](http://example.com/ "Title") inline link.
[This link](http://example.net/) has no title attribute.
```

---

## Escape sequence

You can escape using \\ eg. \\\`

---

## Creating list

Adding a `-` will change it into a list:

```
- Item 1
- Item 2
- Item 3
```

will produce

- Item 1
- Item 2
- Item 3

---

## Quoting

You can create a quote using `>`:

```
> This is a quote
```

will produce

> This is a quote

## Adding Image

![Branching Concepts](http://git-scm.com/figures/18333fig0319-tn.png 'Branching Map')
