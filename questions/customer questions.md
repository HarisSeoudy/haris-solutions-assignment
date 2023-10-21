Question 1:
Hello,

I'm new to search engines, and there are a lot of concepts I'm not educated on. To make my onboarding smoother, it'd help if you could provide me with some definitions of the following concepts:
- Records
- Indexing

I'm also struggling with understanding what types of metrics would be useful to include in the "Custom Ranking." 

Cheers,
George

Answer 1:
Hi George, 

Thanks for reaching out and welcome to the world of search engines! I'd be happy to help you here. 

A record is an object stored within Algolia that represents a single item of your data, for example, a product or a blog post. Each record is made up of multiple attributes that define it, for example, a product record may have the attributes "name", "description", "price" and "color".

An index is a group of records of similar type, for example, products or blog posts. Indexing is the process of sending your records to your Algolia index so they can be searched against.

Ranking search results solely on their textual relevance doesn't always guarantee the best results will appear first. For instance, if a user searches for "t-shirt" and the first page of products are out of stock, they're likely to bounce and purchase from a competitor instead. This is where Custom Ranking steps in by allowing you to use specific business metrics to rank results based on the criteria that is important for your objectives. Some examples of Custom Ranking metrics include sales, stock, views, likes, ratings, release date, margin and so on. Please note, Custom Ranking metrics should have numeric or true/false values.

For further information on this topic please see our detailed documentation here: https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/

I hope this helps and please let me know if you have any questions.

Kind regards,

Haris Seoudy
Senior Solutions Engineer


Question 2:
Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Regards,
Matt

Answer 2:
Hi Matt,

Thank you for sharing this with us. We always welcome customer feedback and are sorry to hear you don’t like the new dashboard design. I’ll pass this information onto our Product Team as they are always looking for ways to improve the dashboard for our users.

In the meantime, you can use our API to clear and delete indices programmatically as opposed to doing it via the dashboard which could increase your efficiency and save time. Please see our detailed documentation on how this can be achieved here: https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/delete-indices/#delete-indices-with-the-api

I’d be happy to jump on a call with you this week to walk you through the above, let me know your availability and we can put something in the diary.

Looking forward to hearing from you soon.

Kind regards,

Haris Seoudy
Senior Solutions Engineer


Question 3:
Hi,

I'm looking to integrate Algolia in my website. Will this be a lot of development work for me? What's the high level process look like?

Regards,
Leo

Answer 3:
Hi Leo, 

Thanks for reaching out, it's great to hear you'd like to implement Algolia on your website!

The typical process consists of five main sprints and we provide helpful resources along the way to make this as easy as possible:

1. Designing UI - Design a search interface to provide a delightful experience to your users. For best practices and inspiration, please see our Figma UI Design Kit here: https://www.algolia.com/doc/guides/building-search-ui/resources/ui-kit/js/

2. Data Pipeline & Indexing - Send the data you want to make searchable to Algolia and keep it in sync with your systems. Please see our detailed documentation on this topic here: https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/

3. Building the Front-End: Develop your designs from the first sprint using Algolia's dedicated front-end libraries, Autocomplete.JS and InstantSearch.JS. They're open-source and contain prebuilt widget's providing fast time to market. Be sure to also send events on typical user actions like clicks and conversions to power Algolia's analytics and AI features: https://www.algolia.com/customer-onboarding/build-front-end/ 

4. Configuring Relevance: Configure your index to provide the best relevance to your users using our intuitive dashboard: https://www.algolia.com/doc/guides/managing-results/relevance-overview/ 

5. Going Live: This is the final sprint where we recommend consulting our implementation checklist before launching your new website: https://www.algolia.com/doc/guides/going-to-production/implementation-checklist/

We also provide a comprehensive digital onboarding experience which goes into more detail about each sprint here: https://www.algolia.com/customer-onboarding/

I hope this helps and please let me know if you have any questions. 

Kind regards,

Haris Seoudy
Senior Solutions Engineer

