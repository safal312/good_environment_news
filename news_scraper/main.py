import pymongo
from dotenv import load_dotenv
import os
import datetime

from NewsScraper import NewsScraper

load_dotenv()

client = pymongo.MongoClient(os.getenv("CONNECTION_STRING"))

aljazeera_latest = client.newsdb.aljazeera_latest

ns = NewsScraper()
aljazeera_articles = ns.scrape_aljazeera().add_sentiment_scores().get_data()
# aljazeera_latest.insert_many(aljazeera_articles)

# scrape gulf news - middle east, environment for UAE https://gulfnews.com/uae/environment
