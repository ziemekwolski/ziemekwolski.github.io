---
layout: post
title: Stop guessing, SQL joins explained
excerpt: Still guessing the correct SQL JOIN? Rewriting queries multiple times? Finally learn which join you really need.
author: Ziemek
category: PostgreSQL
category_url: /categories/postgre_sql.html
seo_keywords: postgresql, postres, joins, explained
---
# Stop guessing, SQL joins explained

Ahh, joins. The point where you start to realize the true power of the relational database, sort of like Darth Vader and the dark side, but less dark. Let’s start with the example we will be following.

Imagine that you are back in high school. You are walking down the hall and you spot your true love. Everything slows down, your heart starts to race and you can’t help but stare at the person. After 2 weeks of thinking about it, you finally decide to ask them out on a date. To your surprise, they agree! Wow this is amazing! I guess wishes do come true.

To avoid messing up the first date, you ask all your friends to give suggestions on what to do on your first date. So, you make a little tiny survey and send it out to your friends. After a couple of days, you check the results.

Oh, this is exciting I wonder what the suggestions are going to be like!

Your database tables look like this:

Table “user"

|  Column   |  Type   | Modifiers|
|-----------|---------|-----------|
|id         | integer | Primary key not null|
|first_name | text    ||
|last_name  | text    ||

Table “activities"

|Column  |  Type   | Modifiers|
|--------|---------|-----------|
|id      | integer | Primary key not null|
|name    | text    ||
|user_id | integer ||

Let’s start with looking at some of the data:

Users table

| id | first_name | last_name|
|----|------------|-----------|
| 1  | Pam        | Beesly|
| 2  | Dwight     | Schrute|
| 3  | Jim        | Halpert|
| 4  | Michael    | Scott|
| 5  | Andy       | Bernard|

I know what you’re thinking, are these people from “The Office”, and yes, yes they are.

The response are coming in super fast and they are hilarious! Just check out some of these suggestions:

| id |                          name                          | user_id|
|----|--------------------------------------------------------|---------|
| 1  | Sky diving                                             |       1|
| 2  | Eating ice cream until your stomach hurts              |       2|
| 3  | Watching old episodes of star trek the next generation |       1|
| 4  | Long walks on the beach looking into each others eyes  |       3|
| 5  | Desserts with lots of peanuts                          |       2|
| 6  | Rock climbing                                          |       3|
| 7  | Biking race                                            |       1|
| 8  | Eating ice cream until your stomach hurts              |       1|
| 9  | French desserts                                        ||
| 10 | Swimming with the whales                               ||

Amazing! There are a few things that you might have noticed.

1. There seems to be a bug in the code. Some of the suggestions came from users that are not entered into the user table. i.e. the user_id column is blank
2. Two people registered, but never answered the question. (Michael and Andy)

Great now that we have our data, we want to know who sent what response. To get that we will need to a join, an inner join I might add.

Now I know what your thinking, I have never joined two tables together. How can I possibly know if it’s correct? Don’t worry, I will show you step by step so that we are all on the same page.

## Venn diagrams and Pancakes

Before we go on, we want to understand why things are called they way they are. So that we can better understand their purpose. Here's an analogy.

Have you ever tried to make two pancakes in a single pan at the same time? Sometimes, even though you try really hard, they end up merging together! Well Venn diagrams are a lot like two pancakes in a pan the just happen to merge together.

## Inner joins & Pancakes

Now, one pancake represents a list of your friends. The other pancake represents the suggestions on a first date also known as activities. The inner join is where you put names and associate them to the activities, that's the delicious center. You essentially will know which friend suggested what.

![Pancake Venn Diagram Inner join](/assets/images/posts/2018-01-01-stop-guessing-sql-joins-explained/Venn-diagram-inner-join_copy.png "Pancake Venn Diagram Inner join")

This means that we will only get data that is common between the two data sets. You will not get response that don't have names and names that don't have responses. Some might call this inner part of the pancake. Haha, get it, inner for inner join. Wow.

Beautifully delicious, isn’t it?

Let’s look at this in SQL:

{% highlight SQL %}
SELECT * FROM users
INNER JOIN activities ON activities.user_id = users.id
ORDER BY activities.id;
{% endhighlight %}

Key areas to focus on would be “INNER JOIN” key words. This is what joins the two tables together, followed by the table we are joining “activities”. Also, we need to tell it which columns to join together, we use the keyword “ON” for this.  In this case, activities.user_id and users.id.

After executing the SQL statement, we get the following data:

| id | first_name | last_name | id |                          name                          | user_id|
|----|------------|-----------|----|--------------------------------------------------------|---------|
|  1 | Pam        | Beesly    | 1  | Sky diving                                             |       1|
|  2 | Dwight     | Schrute   | 2  | Eating ice cream until your stomach hurts              |       2|
|  1 | Pam        | Beesly    | 3  | Watching old episodes of star trek the next generation |       1|
|  3 | Jim        | Halpert   | 4  | Long walks on the beach looking into each others eyes  |       3|
|  2 | Dwight     | Schrute   | 5  | Desserts with lots of peanuts                          |       2|
|  3 | Jim        | Halpert   | 6  | Rock climbing                                          |       3|
|  1 | Pam        | Beesly    | 7  | Biking race                                            |       1|
|  1 | Pam        | Beesly    | 8  | Eating ice cream until your stomach hurts              |       1|

Few of things to notice:

1. I have ordered the data based on activity id to make it easier to follow.
2. The data contains only people that have answered the question.
3. Some of the people have answered question multiple times, that means they appear multiple times.
4. Activities that did not contain a user id are excluded.

So an inner join just gets you what is common between the two data sets and repeats where necessary.

## Left join (aka Left outer join) & Pancakes
Suppose that you need to know all the people that registered, regardless if they answered a question or not. So, since the left pancake represents all the people, that have registered, you want the whole left side. But wait there is more! You also want the delicious center because that contains the association between the responses and the people who did answer.

![Pancake Venn Diagram left join](/assets/images/posts/2018-01-01-stop-guessing-sql-joins-explained/Venn-diagram-left-join_copy.png "Pancake Venn Diagram left join")

Assuming that we start with the users table, aka the people who registered, we get every person regardless if they answered the question or not. This compared to the inner join, where every person listed has answered the question.

Let’s jump back into the SQL to see what this looks like.

{% highlight SQL %}
SELECT * FROM users
LEFT JOIN activities ON activities.user_id = users.id
ORDER BY activities.id;
{% endhighlight %}

Holy guacamole! This looks exactly the same as the “INNER JOIN” except that we have the keywords “LEFT JOIN” to make a left join.  Good eye, Batman! Let’s take a look at our data:


| id | first_name | last_name | id |                          name                          | user_id|
|----|------------|-----------|----|--------------------------------------------------------|---------|
|  1 | Pam        | Beesly    | 1  | Sky diving                                             |       1|
|  2 | Dwight     | Schrute   | 2  | Eating ice cream until your stomach hurts              |       2|
|  1 | Pam        | Beesly    | 3  | Watching old episodes of star trek the next generation |       1|
|  3 | Jim        | Halpert   | 4  | Long walks on the beach looking into each others eyes  |       3|
|  2 | Dwight     | Schrute   | 5  | Desserts with lots of peanuts                          |       2|
|  3 | Jim        | Halpert   | 6  | Rock climbing                                          |       3|
|  1 | Pam        | Beesly    | 7  | Biking race                                            |       1|
|  1 | Pam        | Beesly    | 8  | Eating ice cream until your stomach hurts              |       1|
|  4 | Michael    | Scott     |    |                                                        ||
|  5 | Andy       | Bernard   |    |                                                        ||


Couple of things to notice:

1. Michael and Andy pop up because with a left join it keeps all the data that is contained in the leftmost table, meaning the table that’s mentioned first in the SQL.
2. Notice that not all the activities are listed. We don’t see activities that are not assigned to a user.

So in a left join, we always get all the data from the left table, in this case the user table.

||Left table||Right table|
|-------|-----------|----|-----------|
|SELECT * FROM| users |LEFT JOIN |activities on|

## Right join (aka right outer join) & Pancakes

Ok, what if you wanted to get all the responses, regardless of they have a person attached to them or not. That's a right join! You want the right pancake which represents all the suggested activities, plus the delicious center which represents the names associated to those responses. Mmmm Yummy!

![Pancake Venn Diagram right join](/assets/images/posts/2018-01-01-stop-guessing-sql-joins-explained/Venn-diagram-right-join_copy.png "Pancake Venn Diagram right join")

Brace yourself, here comes the SQL!

{% highlight SQL %}
SELECT * from USERS
RIGHT JOIN activities ON activities.user_id = users.id
ORDER by activities.id;
{% endhighlight %}

Wow, did you see that. Three SQL statements that look exactly the same just went by. It must be a glitch in the Matrix!

Nope! The syntax is very similar, only thing that changed is that we use “RIGHT JOIN” instead of “INNER JOIN” or “LEFT JOIN”.  Our “ON” keyword still tells us what columns we are joining on, activities.user_id and users.id. Let’s look at our data:

| id | first_name | last_name | id |                          name                          | user_id|
|----|------------|-----------|----|--------------------------------------------------------|---------|
|  1 | Pam        | Beesly    | 1  | Sky diving                                             |       1|
|  2 | Dwight     | Schrute   | 2  | Eating ice cream until your stomach hurts              |       2|
|  1 | Pam        | Beesly    | 3  | Watching old episodes of star trek the next generation |       1|
|  3 | Jim        | Halpert   | 4  | Long walks on the beach looking into each others eyes  |       3|
|  2 | Dwight     | Schrute   | 5  | Desserts with lots of peanuts                          |       2|
|  3 | Jim        | Halpert   | 6  | Rock climbing                                          |       3|
|  1 | Pam        | Beesly    | 7  | Biking race                                            |       1|
|  1 | Pam        | Beesly    | 8  | Eating ice cream until your stomach hurts              |       1|
|    |            |           | 9  | French desserts                                        ||
|    |            |           | 10 | Swimming with the whales                               ||


Couple of things to notice:

1. We got all the activities but not all the people who registered. In this case Michael and Andy are missing.
2. We did get such responses such as “swimming with the whales” and “French desserts”, which were entered by non-registered people.

So in a right join, which is the other side of the table that we are joining to, we always get all the data from the right table. In this case the activities table.

||Left table||Right table|
|-------|-----------|----|-----------|
|SELECT * FROM| users |RIGHT JOIN |activities on|

## How to remember left from right?
To remember left join from right join, just ask yourself:

What table has all the data I want?

||Left table||Right table|
|-------|-----------|----|-----------|
|SELECT * FROM| users |[LEFT OR RIGHT] JOIN |activities on|

In this case, if it's the users table It's a left join. If it's the activities table, it's a right join.

## Full outer join (all the pancakes)

Finally, you may want all the data. So, you want all the activities and all the people who have registered regardless whether the activity has a name or if the person registered and never answered the question. That's the whole pancake, left, right and the center. Every sweet delicious bite!


![Pancake Venn Diagram full outer](/assets/images/posts/2018-01-01-stop-guessing-sql-joins-explained/Venn-diagram-full-outer-join.png "Pancake Venn Diagram full outer join")


Let's jump back into the SQL.
{% highlight SQL %}
SELECT * FROM users
FULL OUTER JOIN activities ON activities.user_id = users.id
ORDER BY activities.id;
{% endhighlight %}


As with all the SQL statements that came before this one, the only thing that changed is "full outer join" instead of "left join","right join", or "inner join".

Let's look at out data:

| id | first_name | last_name | id |                          name                          | user_id|
|----|------------|-----------|----|--------------------------------------------------------|---------|
|  1 | Pam        | Beesly    | 1  | Sky diving                                             |       1|
|    |            |           | 10 | Swimming with the whales                               ||
|  2 | Dwight     | Schrute   | 2  | Eating ice cream until your stomach hurts              |       2|
|  1 | Pam        | Beesly    | 3  | Watching old episodes of star trek the next generation |       1|
|  3 | Jim        | Halpert   | 4  | Long walks on the beach looking into each others eyes  |       3|
|  2 | Dwight     | Schrute   | 5  | Desserts with lots of peanuts                          |       2|
|  3 | Jim        | Halpert   | 6  | Rock climbing                                          |       3|
|  1 | Pam        | Beesly    | 7  | Biking race                                            |       1|
|  1 | Pam        | Beesly    | 8  | Eating ice cream until your stomach hurts              |       1|
|    |            |           | 9  | French desserts                                        ||
|  5 | Andy       | Bernard   |    |                                                        ||
|  4 | Michael    | Scott     |    |                                                        ||

Couple of things to notice:

1. We get all the responses. "Swimming with the whales", "French desserts"
2. Also, "Michael" and "Andy" are also here even though they did not answer the question.

The outer join lets us see all the data regardless if it's not included in any of the tables that it's joined to.

## Final thoughts

Well I hope that settles that. Thanks for taking the time to read this post. Leave a comment if you have any questions.

In the next post, I’ll be talking about subqueries. Sign up and you will get the very next one in your inbox.

Until next time.  
