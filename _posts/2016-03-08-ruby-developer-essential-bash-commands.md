---
layout: post
title: Ruby Developer - Essential Bash commands
excerpt: Most of us, Ruby programmers, know Ruby pretty well, but how well do you know your console. In this series we dive into improving your bash skills.
author: Ziemek
category: Bash Commands
category_url: /categories/bash_commands.html
---
# Ruby Developer - Essential Bash commands

Most of us, Ruby programmers, know Ruby pretty well, but how well do you know your console. In this series we dive into improving your bash skills.

So why is this important? Well, you can move a lot of files into well organized folders. All within minutes.

<div class="videoWrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/JZPUy8N4mXA?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
<br>

[Sample files used](https://github.com/ziemekwolski/blog-console-ninja/archive/master.zip)

Commands used in the video above:

{% highlight shell %}
ls -1 | grep "log-file" | sed -e "s/log-file-//" | sed -e "s/-..\.log//" | uniq | awk '{print "mkdir "$1}’ |bash
ls -la | grep drw
ls -1 |  grep "log-file"| awk -F'-' '{print "mv "$0" "$3"-"$4}'

{% endhighlight %}

Or dump all your postgres databases into separate files.
<div class="videoWrapper">
<iframe width="560" height="315" src="https://www.youtube.com/embed/PrQEeR1SaIk?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

Commands used in the video above:

{% highlight shell %}
psql -ls | grep zmwolski | awk '{print "echo "$1" &&  pg_dump "$1" -f "$1".sql"}'

{% endhighlight %}

Improving this skill will make you a skilled programmer, while debugging production servers or doing server configurations.

Most articles about bash focus on individual commands in great detail, instead I will cover a lot of commands with most common uses and focus on combining the commands together to perform powerful actions.

I encourage you, the reader, to [download a copy](https://github.com/ziemekwolski/blog-console-ninja/archive/master.zip) of this repository to follow. It will be much easier to understand and you will gain greater depth of knowledge.

## Getting a quick summary from Git

Lets looks at the commands that we will need or this example:

## Pipe aka "|"

This is not really a command but a single character. For all the commands following, we are going to use the pipe to feed the output stream from one output to the other. Picture one command printing a single line and passing it to the next command. This links the commands together and allows us to do some powerful things.

## Cat

Stands for concatenate. It can combine the output of many files together, but most of the time I just use it to print the output a file.

### Example

Single step, output the contents of a single file.

{% highlight shell %}
~ $ cat repo_log.txt

commit 6c49bc764e7d40905322b398dadb07a3fb936769
Author: Ziemek Wolski <some@example.com>
Date:   Tue Apr 17 18:38:48 2012 -0400

    More Prep for plugin.

commit eb0f769957f2ecbcc082424ac69d44fbe8957033
Author: Ziemek Wolski <some@example.com>
Date:   Tue Apr 17 18:28:16 2012 -0400

    prep for plugin.

{% endhighlight %}

## Grep

(globally search a regular expression and print)
wikipeida: https://en.wikipedia.org/wiki/Grep#cite_note-3

Grep is your search command. It is the way you filter your data using regular expressions. it can match exact strings or do complex regular expressions to filter the output to a precise match.

If you don't know what a regular expression is, I highly recommend you [download reggy](http://reggyapp.com/), to try it yourself. I will not be covering regular expressions here.

### Example - Full example

We are going to pretend that “repo_log.txt” (See the [download sample](https://github.com/ziemekwolski/blog-console-ninja/archive/master.zip)), contains the output of git log. We are trying to get a summary of all commits done on Mar 22. To do this, we are using the cat command, which just outputs a file to standard out. We then grep for “Mar 22” and using the “-A” (after) option to get the 3  following lines. Finally we grep for some space to get only the commit messages.

Step 1 - output the file (usually done with git log command)

{% highlight shell %}
cat repo_log.txt
commit 6c49bc764e7d40905322b398dadb07a3fb936769
Author: Ziemek Wolski <some@example.com>
Date:   Tue Apr 17 18:38:48 2012 -0400

    More Prep for plugin.

commit eb0f769957f2ecbcc082424ac69d44fbe8957033
Author: Ziemek Wolski <some@example.com>
Date:   Tue Apr 17 18:28:16 2012 -0400

    prep for plugin.

commit e4ac15765ed2b0bab51ee748c7ec18e866c333aa
Author: Ziemek Wolski <some@example.com>
Date:   Thu Apr 5 18:44:35 2012 -0400

    Removed all un-necessary javascript.
{% endhighlight %}

Step 2 - filter out commits we want and Grabbing the date 3 lines before that.

{% highlight shell %}
~ $ cat repo_log.txt | grep "Mar 22" -A3

Date:   Thu Mar 22 16:37:01 2012 -0400

    Up and running.

--
Date:   Thu Mar 22 12:24:38 2012 -0400

    Puzzle is on the screen! yeye

--
Date:   Thu Mar 22 11:38:05 2012 -0400

    initial app with just image saving working.
{% endhighlight %}

Step 3 - Grab for spaces and Done.
{% highlight shell %}
~ $ cat repo_log.txt | grep "Mar 22" -A3 | grep "    "

    Up and running.
    Puzzle is on the screen! yeye
    initial app with just image saving working.
{% endhighlight %}

##  Renaming a large number of files

Here we will rename a large number of files. Let's look at the commands that we will need for that.

Ls

Simple list command. We all use it everyday, but did you know that you could list a set of files on individual lines using this command. It's not very well known and it will be really apparent why this important in a little bit. For now here is the command:

{% highlight shell %}
~ $ ls -1

generating_files.rb
repo_log.txt
{% endhighlight %}

Sed

This is where things start to get interesting. The streamed editor. Allows you to easily do substitutions on a console. As well as repetition  if needed. Again it uses regular expressions to find and replace.
[Source](http://www.grymoire.com/Unix/Sed.html)

Here we are going to strip out “log-file-“ and “.log” from file names printed and just get dates.

Follow along by running “ruby generating_files.rb” (see the download package).

Step 1

{% highlight shell %}
ls -1
generating_files.rb
log-file-2015-08-09.log
log-file-2015-08-10.log
log-file-2015-08-11.log
log-file-2015-08-12.log
{% endhighlight %}

Step 2 filter, just get the files names we want:

{% highlight shell %}
ls -1 | grep "log-file"
log-file-2015-08-09.log
log-file-2015-08-10.log
log-file-2015-08-11.log
log-file-2015-08-12.log
{% endhighlight %}

Step 3, substutide “log-file-“ with nothing.

{% highlight shell %}
ls -1 | grep "log-file" | sed -e 's/log-file-//g'
2015-08-09.log
2015-08-10.log
2015-08-11.log
2015-08-12.log
{% endhighlight %}

Step 4, remove the “.log” on the files

{% highlight shell %}
ls -1 | grep "log-file" | sed -e 's/log-file-//g' | sed -e 's/.log//g'
2015-08-09
2015-08-10
2015-08-11
2015-08-12
{% endhighlight %}

Awk

Pattern-directed scanning and processing language. (From the man page). I generally only use awk to grab individual columns of data from an output. It’s pretty good at guessing columns. This is done by using the ‘{print $1}’ syntax.

In the following command we will rename 200 files all at once.

Step 1. Grab the last command from the last example:

{% highlight shell %}
ls -1 | grep "log-file" | sed -e 's/log-file-//g' | sed -e 's/.log//g'
2015-08-09
2015-08-10
2015-08-11
2015-08-12
{% endhighlight %}

step 2. Tell awk to re-print the first column and add the move command on each line.

{% highlight shell %}
ls -1 | grep "log-file" | sed -e 's/log-file-//g' | sed -e 's/.log//g' | awk '{print "mv log-file-"$1".log","super-awesome-"$1"-log-file.log"}'

mv log-file-2015-08-09.log super-awesome-2015-08-09-log-file.log
mv log-file-2015-08-10.log super-awesome-2015-08-10-log-file.log
mv log-file-2015-08-11.log super-awesome-2015-08-11-log-file.log
mv log-file-2015-08-12.log super-awesome-2015-08-12-log-file.log
{% endhighlight %}

Step 3. Pipe into bash. This will execute whatever is printed to the screen one line at a time.

{% highlight shell %}
ls -1 | grep "log-file" | sed -e 's/log-file-//g' | sed -e 's/.log//g' | awk '{print "mv log-file-"$1".log","super-awesome-"$1"-log-file.log"}' | bash
{% endhighlight %}

Step 4. Check your output.

{% highlight shell %}

ls -1 | grep "log-file"
super-awesome-2015-08-09-log-file.log
super-awesome-2015-08-10-log-file.log
super-awesome-2015-08-11-log-file.log
super-awesome-2015-08-12-log-file.log

{% endhighlight %}

Notice that the “super-awesome" and the dates now appear in the front of each line.

I really hope you have enjoyed this brief look at your bash console and how it can speed up your productivity in certain cases. As usual if you have any questions or comments please add them below.