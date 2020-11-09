---
layout: post
title: Organizing Ruby on Rails Models
excerpt: Organizing Ruby on Rails models using comments. Get everyone on your team to use the same structure within your models.
author: Ziemek
category: Ruby
category_url: /categories/ruby.html
seo_keywords: Ruby, Ruby on Rails, Models, style
hero-image-url: /assets/images/posts/2016-06-01-organizing-ruby-on-rails-models/photo-1442512595331-e89e73853f31.jpeg
hero-image-author: Karl Fredrickson
hero-image-source: https://unsplash.com/kfred
redirect_from: /Organizing-Ruby-on-Rails-Models
---
# Organizing Ruby on Rails Models

## The Challenge

A few years ago, I remember trying to get developers to work with a particular style when working with models. Placing Class methods before instance methods, making sure that constants appear that the top and so forth.

I would discuss these structures with other developers in our team and write beautiful documentation to show what the structure of a particular model class should be. I would send it around to the list of developers and what happened?  No one used the documentation. No one bothered. Perhaps it was the stress level at the time.  I eventually gave up and stuck with the messy approach that we were use to.

Fast forward a few years into my career and I end up meeting a developer by the name of <a href="https://twitter.com/heshamized">Hesham</a>  from an agency in Toronto, The Working Group.

He introduces this simple structure, for the models in our app:

<p>
  <video poster="/assets/images/posts/2016-06-01-organizing-ruby-on-rails-models/using-snippets-poster.png" src="https://s3.amazonaws.com/zmwolski-uploads/uploads/static/using-snippets.mp4" controls="true" loop="" autoplay="" width="640" class="screenshot" style="max-width: 100%;"></video>
</p>

{% highlight ruby %}
class User < ActiveRecord::Base

  # == Constants ============================================================

  # == Attributes ===========================================================

  # == Extensions ===========================================================

  # == Relationships ========================================================

  # == Validations ==========================================================

  # == Scopes ===============================================================

  # == Callbacks ============================================================

  # == Class Methods ========================================================

  # == Instance Methods =====================================================

end
{% endhighlight %}

## The greatness in simplicity

The structure is simple and easy to follow. Simply place the appropriate code below the comment heading.

Surprisingly, it caught on. Developers within our team started to adopt this style. Not only that, the code began to feel more readable and it became easier to work with. Scopes were no longer listed in odd places. Class methods were always listed in the same spot and not intermixed with instance methods.

This simple change, introduced a level of organization to our code that was quickly adopted and used. And it’s just comments within the code base!

## Why this worked

This worked well because the documentation was not an external document that each developer needed to look up. This might seem insignificant, why would it take so long to find a document that everyone already has booked marked. Simple, it doesn’t break context. You don’t need to switch applications, you don’t even need to look anywhere else. It’s all right there.

Everyone who used it, saw immediate value. They were able to find the code much quicker and were able to see the section where their code should exist.
From a maintainability standpoint, there is no question where the code should go. It became pretty obvious. It’s right there in the comment and the guessing game is over.

## Closing thoughts

The above code is used for model specifically. I actually not used them in any other place. I personally enjoy this style.
Here is the snippet to added to your sublime text or atom.

## Resources

Snippets are great if you need a particular structure of code over and over again. The following only works when you are in a ruby class. (Feel free to modify if this does not suit your needs.)

### Sublime Text:

  1. Go to tools -> Developer -> New Snippet

   ![Developer Tools Sublime](/assets/images/posts/2016-06-01-organizing-ruby-on-rails-models/Developer_and_Tools-sublime.png "Developer Tools Sublime")

  2 . Replace with the following code:

{% highlight ruby %}
  &lt;snippet&gt;
    &lt;content&gt;&lt;![CDATA[
  # == Constants ============================================================

  # == Attributes ===========================================================

  # == Extensions ===========================================================

  # == Relationships ========================================================

  # == Validations ==========================================================

  # == Scopes ===============================================================

  # == Callbacks ============================================================

  # == Class Methods ========================================================

  # == Instance Methods =====================================================

  ]]&gt;&lt;/content&gt;
    &lt;!-- Optional: Set a tabTrigger to define how to trigger the snippet --&gt;
    &lt;tabTrigger&gt;#==&lt;/tabTrigger&gt;
    &lt;!-- Optional: Set a scope to limit where the snippet will trigger --&gt;
    &lt;scope&gt;source.ruby&lt;/scope&gt;
  &lt;/snippet&gt;

{% endhighlight %}
  3. Save as: "model-structure.sublime-snippet" <- important.
  4. Open a model type: "#==" [Tab]

### Atom

1. Open Atom -> Snippets ...

  ![Developer Tools Atom](/assets/images/posts/2016-06-01-organizing-ruby-on-rails-models/snippets_-_Atom.png "Developer Tools Atom")

2.  Place the code at the bottom of the file.

{% highlight ruby %}

  '.source.ruby':
    'Model class structure':
      'prefix': '#=='
      'body': '''
        # == Constants ============================================================

        # == Attributes ===========================================================

        # == Extensions ===========================================================

        # == Relationships ========================================================

        # == Validations ==========================================================

        # == Scopes ===============================================================

        # == Callbacks ============================================================

        # == Class Methods ========================================================

        # == Instance Methods =====================================================
  '''
{% endhighlight %}

3.  Go to any ruby file, type "#==" [tab]