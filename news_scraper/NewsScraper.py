import requests
from bs4 import BeautifulSoup
from nltk.sentiment import SentimentIntensityAnalyzer
import subprocess
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class Article(dict):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setdefault("title", "")
        self.setdefault("link", "")
        self.setdefault("body", "")
        self.setdefault("date", "")
        self.setdefault("image", "")
        self.setdefault("scores", {})
        self.setdefault("keywords", [])
        self.setdefault("greenwashing", 0)
        self.setdefault("source", "")

class NewsScraper:
    def __init__(self):
        self.sia = SentimentIntensityAnalyzer()
        self.scraped_data = []
        self.options = Options()
        # self.options.add_argument('--headless=new')
        # self.options.add_argument('--no-sandbox')
        # self.options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=self.options)
        self.greenwords = []
    
    def get_greenwords(self):
        with open("greenwashing.csv", "r") as f:
            # print(f.readlines())
            for line in f.readlines():
                line = line.strip()
                if len(line) > 2:
                    self.greenwords.extend(line.split(" "))
                else:
                    self.greenwords.append(line)

    def get_data(self):
        return self.scraped_data

    def add_sentiment_scores(self):
        if not len(self.greenwords) > 0: self.get_greenwords()

        for i in range(len(self.scraped_data)):
            title = self.scraped_data[i]['title']
            body = self.scraped_data[i]['body']
            if not title: title= ""
            if not body: body = ""
            all_text = title + " " + body
            scores = self.sia.polarity_scores(all_text)

            if scores["compound"] > 0:
                title_words = title.split(" ")
                for word in title_words:
                    if word in self.greenwords:
                        self.scraped_data[i]["greenwashing"] = 1
                        self.scraped_data[i]["keywords"].append("greenwashing")
                        break

            self.scraped_data[i]["scores"] = scores
        return self
    
    def scrape_scmp(self):
        driver = self.driver.get("https://www.scmp.com/topics/environment")

        article_div = self.driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div/section/div/div[4]/div[1]")
        articles = article_div.find_elements(By.XPATH, "./*")[1:]

        data = []

        for item in articles:
            try:
                article = Article()
                # print(item.get_attribute("outerHTML"))
                h2s = item.find_elements(By.TAG_NAME, "h2")

                if h2s: 
                    article['title'] = h2s[0].text
                else: continue

                article['image'] = item.find_element(By.TAG_NAME, "img").get_attribute("src")
                article['link'] = "https://www.scmp.com" + item.find_element(By.TAG_NAME, "a").get_attribute("href")
                article['date'] = item.find_element(By.TAG_NAME, "time").text
                article['body'] = item.find_element(By.TAG_NAME, "p").text
                article['keywords'].extend(['scmp','asia','asian'])
                article['source'] = "South China Morning Post"

                data.append(article)
            except:
                print("Issue in SCMP article")

        self.scraped_data.extend(data)
        return self

    def scrape_euobserver(self):
        driver = self.driver.get("https://euobserver.com/green-economy")

        articles = self.driver.find_elements(By.TAG_NAME, "article")

        data = []

        for item in articles:
            try:
                article = Article()

                ol = item.find_elements(By.TAG_NAME, "ol")
                if ol: continue

                article['link'] = "https://euobserver.com/" + item.find_element(By.TAG_NAME, "a").get_attribute("href")
                
                image = item.find_elements(By.TAG_NAME, "img")
                if image: 
                    article['title'] = item.find_elements(By.TAG_NAME, "a")[1].text
                    article['image'] = image[0].get_attribute("src")
                else:
                    article['title'] = item.find_elements(By.TAG_NAME, "a")[0].text
                article['date'] = item.find_element(By.TAG_NAME, "time").text
                article['body'] = item.find_element(By.TAG_NAME, "p").text

                article['keywords'].extend(['eu', 'europe', 'green economy', 'green'])
                article['source'] = "euobserver"

                data.append(article)
            except:
                print("Issue in EUObserver")
        
        self.scraped_data.extend(data)
        return self

    def scrape_allafrica(self):
        driver = self.driver.get("https://allafrica.com/environment/")

        main_articles = self.driver.find_elements(By.CLASS_NAME, "foundation")

        data = []

        for item in main_articles:
            try:
                article = Article()

                article['link'] = item.find_element(By.TAG_NAME, "a").get_attribute("href")
                article['title'] = item.find_element(By.TAG_NAME, "a").get_attribute("title")
                article['image'] = item.find_element(By.TAG_NAME, "img").get_attribute("src")
                article['keywords'].extend(["africa", "african", "environment"])
                
                article['source'] = "allAfrica"

                data.append(article)
            except:
                print("Issue in All Africa article")
        
        self.scraped_data.extend(data)
        return self
    
    def scrape_khaleej_times(self):
        driver = self.driver.get("https://www.khaleejtimes.com/uae/environment")

        articles = self.driver.find_elements(By.TAG_NAME, "article")

        data = []

        for item in articles:
            try:
                article = Article()

                article['link'] = item.find_element(By.TAG_NAME, "a").get_attribute("href")
                article['image'] = item.find_element(By.TAG_NAME, "img").get_attribute("data-srcset")
                article['title'] = item.find_element(By.CLASS_NAME, "post-title").text
                article['body'] = item.find_element(By.CLASS_NAME, "post-summary").text
                article['keywords'].extend(["uae", "environment"])
                article['source'] = "Khaleej Times"

                data.append(article)
            except:
                print("Issue in scraping Khaleej Times article")
        
        self.scraped_data.extend(data)
        return self
    
    def scrape_the_national(self):
        driver = self.driver.get("https://www.thenationalnews.com/climate/environment/")

        stories = self.driver.find_elements(By.CLASS_NAME, "story-card")
        list_items = []
        try:
            list_items = WebDriverWait(self.driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "list-item")))
        except:
            print("Couldn't get listed items in The National")

        data = []

        for item in stories:
            try:
                article = Article()
                
                article['link'] = item.find_element(By.TAG_NAME, "a").get_attribute("href")
                article['image'] = item.find_element(By.TAG_NAME, "img").get_attribute("src")
                article['title'] = item.find_element(By.CLASS_NAME, "story-card-headline").text
                article['keywords'].append(item.find_element(By.TAG_NAME, "h3").text.lower())
                article['keywords'].extend(["environment", "uae"])
                article['source'] = "The National"
                
                data.append(article)
            except:
                print("Issue in The National article")

        for item in list_items:
            try:
                article = Article()

                article['link'] = item.find_element(By.TAG_NAME, "a").get_attribute("href")
                article['title'] = item.find_element(By.TAG_NAME, "h2").text
                article['image'] = item.find_element(By.TAG_NAME, "img").get_attribute("src")
                article['keywords'].extend(["environment","uae"])
                article['source'] = "The National"
                
                data.append(article)
            except:
                print("Issue in The National Article")
        
        self.scraped_data.extend(data)
        return self

    def scrape_nyt_energy_environment(self):

        self.driver.get("https://www.nytimes.com/section/business/energy-environment")

        main = self.driver.find_element(By.ID, "stream-panel")
        articles = main.find_elements(By.TAG_NAME, "li")
        
        data = []

        for item in articles:
            article = Article()
            
            try:
                article['date'] = item.find_elements(By.TAG_NAME, "span")[-1].text
                article['link'] = "https://www.nytimes.com" + item.find_element(By.TAG_NAME, "a").get_attribute("href")
                article['title'] = item.find_element(By.TAG_NAME, "h3").text
                article['image'] = item.find_element(By.TAG_NAME, "img").get_attribute("src")
                article['body'] = item.find_element(By.TAG_NAME, "p").text
                article['keywords'].extend(["environment", "energy", "business", "nyt"])
                article['source'] = "New York Times"

                data.append(article)
            except:
                print("Skipping faulty article in NYT Energy and Environment")

        self.scraped_data.extend(data)

        return self
            
    def scrape_ehn(self):
        response = requests.get('https://www.ehn.org/biodiversity/')
        soup = BeautifulSoup(response.text, 'html.parser')

        items = soup.find_all("div", {"class": "widget"})

        data = []

        for item in items:
            article = Article()
            
            try:
                head = item.find("div", {"class": "row"}).find("div", {"class": "widget__head"})

                article['link'] = head.find("a").get("href")
                article['title'] = item.find(class_="widget__headline").text.strip()
                # article['title'] = item.find("h4", {"class": "widget__headline"}).text.strip()
                article['image'] = item.find("img", {"role": "img"}).get("data-runner-src")
    
                # body = item.find("div", {"class": "widget__body"})
                article['date'] = item.find("div", {"class": "social-date"}).text.strip()
                article['body'] = item.find("div", {"class": "body-description"}).text.strip()
                article['source'] = "Environment Health News"

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
                article = Article()

                gc = item.find("div", {"class": "gc__content"})
                title_el = gc.find("div", {"class": "gc__header-wrap"})
                article['title'] = title_el.find("h3", {"class": "gc__title"}).find("span").text.replace("\xad", "")
                article['link'] = "https://aljazeera.com" + title_el.find("a").get("href")

                desc = gc.find("div", {"class": "gc__body-wrap"})
                article['body'] = desc.text.replace("\xad", "")

                date = gc.find("footer", {"class": "gc__footer"}).find_all("span")[1]
                article['date'] = date.text.replace("\xad", "")

                date = item.find("img")
                article['image'] = "https://aljazeera.com" + date.get("src")
                article['keywords'].extend(["middle east", "mena"])
                article["source"] = "Aljazeera"

                data.append(article)
            self.scraped_data.extend(data)
        except:
            print("Exception in Scraping Aljazeera")
        
        return self
            
    