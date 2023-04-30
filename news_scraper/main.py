import pymongo
from dotenv import load_dotenv
import os
import datetime

from NewsScraper import NewsScraper

load_dotenv()

client = pymongo.MongoClient(os.getenv("CONNECTION_STRING"))
latest = client.newsdb.latest

ns = NewsScraper()
latest.delete_many({})      # clear out old news

aljazeera_articles = ns.scrape_aljazeera().add_sentiment_scores()
ehn_climate = ns.scrape_ehn().add_sentiment_scores()
nyt = ns.scrape_nyt_energy_environment().add_sentiment_scores()
thenational = ns.scrape_the_national().add_sentiment_scores()
# print(len(ns.get_data()))
latest.insert_many(ns.get_data())

# scrape gulf news - middle east, environment for UAE https://gulfnews.com/uae/environment