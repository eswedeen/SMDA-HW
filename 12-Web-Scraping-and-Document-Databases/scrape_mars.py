#Dependencies
from bs4 import BeautifulSoup
from splinter import Browser
import requests


def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "C:/Users/Erik/Desktop/SMDA-HW/12-Web-Scraping-and-Document-Databases/chromedriver.exe"}
    return Browser("chrome", **executable_path, headless=False)


def scrape():
    browser = init_browser()

    ### NASA Mars News
    news_url="https://mars.nasa.gov/news/"

    # Retrieve page with the requests module
    response = requests.get(news_url)

    # Create BeautifulSoup object; parse with 'html.parser'
    soup = BeautifulSoup(response.text, 'html.parser')

    content_title = soup.find("div", class_="content_title")
    news_title=content_title.find('a').text

    print("-----------------")
    print(news_title)
    print("Scraping Complete")

    return news_title


