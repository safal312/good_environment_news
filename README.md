# Good Environment News
Link: https://good-environment-news.vercel.app/


A portal that gives you “positive” news from multiple sources. This project focuses specifically on select popular international news sources and some UAE sources for specific case study. This project will also act as an exploration of the different narratives present abundantly in popular news across different regions. The abundance of articles or lack thereof will speak to the popularity of the declensionist narrative in different regions. 
Moreover, it acts as a way of reflecting the general sentiment on the matter of environmental crisis in different regions.

## Motivation
The crisis narrative is well-documented and popular. However, this sense of hopelessness and indifference might not always be the right attitude. The concentration of the declensionist argument calls for new questions and new attitudes to dealing with the human-nature relationship. This art project presents a way to challenge the hopelessness narrative of the status quo.
The call for alternative narratives isn’t a new concept. This project tries to implement this idea into something tangible.

## Methodology
### Picking Sources
First, I picked some popular sources curated by a trusted body like Society of Environmental Journalists (SEJ). I picked more sources covering different regions: Asia, Europe, Africa, Middle East, and the UAE specifically.
- Environment Health News
- New York Times: Energy/Environment
- Aljazeera: Environment
- The National (UAE)
- Khaleej Times (UAE)
- South China Morning Post
- EU Observer
- allAfrica

### What the script does
Every day, a program runs that gathers data from different news sources. Then, sentiment analysis is performed on the title of the articles. Each article is tagged if it can potentially be greenwashing if it includes a certain set of words. Next, the articles are stored in a database. The website accesses the database and displays the articles.

## Contribution
There are three areas for contribution in this project:
- Adding new sources
- Maintaing new sources
- Adding more words to the `news_scraper/greenwashing.csv` file to increase the dataset of potential words that can appear in greenwashing campaigns.

*For non-developers:* Feel free to raise an issue in the issues tab if you want any new news sources added with a proper description and reasoning.
