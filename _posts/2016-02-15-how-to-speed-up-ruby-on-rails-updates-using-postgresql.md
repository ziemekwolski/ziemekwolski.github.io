---
layout: post
title: How to speed up Ruby on Rails updates using PostgreSQL
excerpt: While working with Ruby on Rails, I sometimes need to update a set of fields very quickly. Here are four different ways to speed up your updates.
author: Ziemek
category: Ruby
category_url: /categories/ruby.html
seo_keywords: Ruby on Rails, scaling, models
hero-image-url: /assets/images/posts/2016-02-15-how-to-speed-up-ruby-on-rails-updates-using-postgresql/IMG_4985.jpg
redirect_from: /3-how-to-speed-up-ruby-on-rails-updates-using-postgresql
---
# How to speed up Ruby on Rails updates using PostgreSQL

While working with Ruby on Rails, I sometimes need to update a set of fields very quickly. Here are four different ways to speed up your updates.

<h2>#1 The simple update</h2>

Let's assume that you are updating last time a user has logged in. For that, most of the time the following code works well:

{% highlight ruby %}
User.find(12).touch

{% endhighlight %}

<h2>#2 Updating multiple items at a time</h2>

In most situations the above statement works fine, but what if you need to update a lot of items.

Say that you have a user that is currently checking out, and you need to update the purchased items at the time of a transaction. Using touch in a looping structure, might be a little slow and has potential race conditions. So, you might want to resort to:

{% highlight ruby %}
checkout_items.update_all(["purchased_at = ?", Time.zone.now])

{% endhighlight %}

I assume that checkout_items contain all the items that you want to update. The code above avoids the race condition and is completely atomic.

A word of caution, this will overwrite any data that is current in the purchased_at field, so you may want to structure your code in such a way to avoid such scenarios.

<h2>#3 Update a set of records based on other records.</h2>

In other times, you might be migrating data either in a rake task or as part of a migration. In that case, it might be possible that you need to update a set of fields based on another set of fields. This kind of operation could take a few minutes or hours depending on your data set.  Using straight SQL is your best bet at speeding things up.

In this example, we want to save the user’s card UUID at the time of purchase. We already have the card information stored in the user table; we just need to move it to the transaction table. Here is the SQL to do it.

Your schema would look something like this:

{% highlight text %}
Table "users"
======================

      Column      |            Type
------------------+-----------------------------
 id               | integer
 name             | character varying
 email            | character varying
 card_uuid        | character varying
 created_at       | timestamp without time zone
 updated_at       | timestamp without time zone
Indexes:
    "g_users_pkey" PRIMARY KEY, btree (id)


Table "transactions"
===========================

      Column      |            Type
------------------+-----------------------------
 id               | integer
 user_id          | integer
 card_uuid        | character varying
 created_at       | timestamp without time zone
 updated_at       | timestamp without time zone
Indexes:
    "transactions_pkey" PRIMARY KEY, btree (id)
{% endhighlight %}


Use this code to generate it:

{% highlight shell %}
rails g model user name:string email:string card_uuid:string
rails g model transaction user_id:integer card_uuid:string

{% endhighlight %}

Generate some data:

{% highlight ruby %}
User.create(name: "user1", email: "some_email@example.com", card_uuid: SecureRandom.hex)

10.times do |t|
    Transaction.create(user_id: User.first.id)
end

{% endhighlight %}

Run this code to update all the transactions card_uuid:

{% highlight sql %}
UPDATE transactions AS t
SET card_uuid = u.card_uuid
FROM users AS u
WHERE t.user_id = u.id;

{% endhighlight %}

_[Credit: Mark Byers](http://stackoverflow.com/questions/7869592/how-to-do-an-update-join-in-postgresql)_

<h2>#4 Updating records based on stored IDs.</h2>

Lastly, you might be performing a complex ETL process. Because of data available at the time, you happen to have a set of ID’s that you need to update within a text field in your database. I’ve only seen this used in a memory store, such as RabbitMQ or Redis when data is precomputed in memory and dumped to a relational database for analysis.

Say that you are building an Ad tracking platform. You know the last time a site was considered as a potential candidate for a redirect. This logic along with an elaborate set of rules are stored in a NodeJS server. When you migrate the data from memory store to your relational database, you already have the set of IDs for the websites that were considered. All you need to do now is store the site_redirects and update the last_considered_at on each of the sites records.

In this case, we might assume your database table is called site_redirects and the field containing your IDs is sites_considered_ids.

Your schema looks like this:

{% highlight shell %}
Table "site_redirects"
======================

        Column        |            Type
----------------------+-----------------------------
 id                   | integer
 redirecting_site_id  | integer
 sites_considered_ids | character varying
 redirecting_url      | text
 created_at           | timestamp without time zone
 updated_at           | timestamp without time zone
Indexes:
    "site_redirects_pkey" PRIMARY KEY, btree (id)


Table "sites"
=============

       Column       |            Type
--------------------+-----------------------------
 id                 | integer
 name               | character varying
 last_considered_at | timestamp without time zone
 created_at         | timestamp without time zone
 updated_at         | timestamp without time zone
Indexes:
    "sites_pkey" PRIMARY KEY, btree (id)

{% endhighlight %}

Run this code to generate the above schema:

{% highlight shell %}
rails g model site_redirect redirecting_site_id:integer sites_considered_ids:string redirecting_url:text
rails g model sites name:string last_considered_at:datetime

{% endhighlight %}

Create your records like this:
{% highlight ruby %}
3.times do | s|
  Site.create(name: "site #{s}")
end

SiteRedirect.create(redirecting_site_id: 1, sites_considered_ids: "1,2,3", redirecting_url:"https://google.com")

{% endhighlight %}

At the time of your ETL, you would be running something like this:

{% highlight sql %}
UPDATE sites as s
SET last_considered_at = r.created_at
FROM site_redirects as r
WHERE s.id = ANY (string_to_array(r.sites_considered_ids, ',')::integer[]);

{% endhighlight %}

_[Credit David Johnston](http://www.postgresql.org/message-id/1386212527214-5781774.post@n5.nabble.com)_

The last statement is something that I find amazing! It updates all the sites last_considered_at record based on when the site_redirects record was created.

Usually, a large number of SQL calls to performed to accomplish the above. That’s very slow. Here you are doing it in a single SQL call. Pretty Amazing!

I hope that you have enjoyed this post. If you have any comments, please post them below.