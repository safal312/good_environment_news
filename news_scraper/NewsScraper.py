import requests
from bs4 import BeautifulSoup
from nltk.sentiment import SentimentIntensityAnalyzer

class NewsScraper:
    def __init__(self):
        self.sia = SentimentIntensityAnalyzer()
        self.scraped_data = []
    
    def get_data(self):
        return self.scraped_data

    def add_sentiment_scores(self):
        for i in range(len(self.scraped_data)):
            all_text = self.scraped_data[i]['title'] + " " + self.scraped_data[i]['body']
            scores = self.sia.polarity_scores(all_text)
            self.scraped_data[i]["scores"] = scores
        return self
    
    def scrape_aljazeera(self):
        response = requests.get('https://www.aljazeera.com/tag/environment/')
        soup = BeautifulSoup(response.text, 'html.parser')

        items = soup.find_all("article", {"class": "gc"})

        data = []

        try:
            for item in items:
                article = {"title": "", "link": "", "body": "", "date": "", "image": "",
                 "scores": {}, "source": "Aljazeera"}

                gc = item.find("div", {"class": "gc__content"})
                title_el = gc.find("div", {"class": "gc__header-wrap"})
                article['title'] = title_el.find("h3", {"class": "gc__title"}).find("span").text.replace("\xad", "")
                article['link'] = title_el.find("a").get("href")

                desc = gc.find("div", {"class": "gc__body-wrap"})
                article['body'] = desc.text.replace("\xad", "")

                date = gc.find("footer", {"class": "gc__footer"}).find_all("span")[1]
                article['date'] = date.text.replace("\xad", "")

                date = item.find("img")
                article['image'] = date.get("src")

                data.append(article)
            self.scraped_data = data
        except:
            print("Exception in Scraping Aljazeera")
            self.scraped_data = []
        
        return self
            
    