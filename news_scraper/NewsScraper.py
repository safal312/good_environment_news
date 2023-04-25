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

    def scrape_nyt_energy_environment(self):
        response = requests.get('https://www.nytimes.com/section/business/energy-environment')
        soup = BeautifulSoup(response.text, 'html.parser')

        main = soup.find("section", {"id": "stream-panel"})
        articles = main.find_all("li")

        data = []

        for item in articles:
            article = {"title": "", "link": "", "body": "", "date": "", "image": "",
                "scores": {}, "source": "NYT"}
            
            try:
                article['date'] = item.find_all("span")[-1].text
                article['link'] = "https://www.nytimes.com" + item.find("a").get("href")
                article['title'] = item.find("h2").text
                article['image'] = item.find("img").get("src")
                article['body'] = item.find("p").text
            except:
                print("Skipping faulty article in NYT Energy and Environment")
                continue
            data.append(article)

        self.scraped_data.extend(data)

        return self
            
    def scrape_ehn(self):
        response = requests.get('https://www.ehn.org/biodiversity/')
        soup = BeautifulSoup(response.text, 'html.parser')

        items = soup.find_all("div", {"class": "widget"})

        data = []

        for item in items:
            article = {"title": "", "link": "", "body": "", "date": "", "image": "",
                "scores": {}, "source": "EHN"}
            
            try:
                head = item.find("div", {"class": "row"}).find("div", {"class": "widget__head"})

                article['link'] = "https://aljazeera.com" + head.find("a").get("href")
                article['title'] = item.find(class_="widget__headline").text.strip()
                # article['title'] = item.find("h4", {"class": "widget__headline"}).text.strip()
                article['image'] = "https://aljazeera.com" + item.find("img", {"role": "img"}).get("data-runner-src")
    
                # body = item.find("div", {"class": "widget__body"})
                article['date'] = item.find("div", {"class": "social-date"}).text.strip()
                article['body'] = item.find("div", {"class": "body-description"}).text.strip()

            except:
                print("Skipping faulty article in EHN")
                continue
            data.append(article)

        self.scraped_data.extend(data)

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
            self.scraped_data.extend(data)
        except:
            print("Exception in Scraping Aljazeera")
        
        return self
            
    