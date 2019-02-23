#Dependencies
from bs4 import BeautifulSoup
from splinter import Browser
import requests


def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "C:/Users/Erik/Desktop/SMDA-HW/12-Web-Scraping-and-Document-Databases/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)


def scrape():

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



### JPL Mars Space Images - Featured Image

jpl_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"

browser = Browser('chrome')

#visit site
browser.visit(jpl_url)

# HTML object
html = browser.html

# Parse HTML with Beautiful Soup
soup = BeautifulSoup(html, 'html.parser')

articles =soup.find('ul', class_='articles')
fancybox = articles.find('a', class_='fancybox')
href = fancybox['data-fancybox-href']
featured_image_link = "https://www.jpl.nasa.gov" + href

browser.visit(featured_image_link)

print("-----------------")
print("featured_image_link")
print(featured_image_link)
print("Scraping Complete")

return featured_image_link



### Mars Weather

weather_url="https://twitter.com/marswxreport?lang=en"

# Retrieve page with the requests module
response = requests.get(weather_url)

# Create BeautifulSoup object; parse with 'html.parser'
soup = BeautifulSoup(response.text, 'html.parser')

#find the weather description paragraph 
weather_text = soup.find('p', class_="TweetTextSize").text


print("-----------------")
print("weather_text\n")
print(weather_text)
print("\nScraping Complete")

return weather_text



### Mars Facts

facts_url="https://space-facts.com/mars/"

# Retrieve page with the requests module
response = requests.get(facts_url)

# Create BeautifulSoup object; parse with 'html.parser'
soup = BeautifulSoup(response.text, 'html.parser')

fact_keys=[]
fact_values=[]
facts_dict={}

fact_keys=soup.find_all("td", class_="column-1")
fact_values=soup.find_all("td", class_="column-2")

for i in range(len(fact_values)):
    facts_dict[fact_keys[i].text] = fact_values[i].text

facts_dict

return facts_dict



### Mars Hemispheres

hemispheres_url="https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"

hemisphere_titles=[]
hemisphere_image_urls=[]

browser=Browser('chrome')

#visit website for hemispheres
browser.visit(hemispheres_url)

# HTML object
html = browser.html
# Parse HTML with Beautiful Soup
soup = BeautifulSoup(html, 'html.parser')
# Retrieve all elements that contain book information
hemispheres = soup.find_all('div', class_='item')

# Iterate through each hemisphere "item"
for hemisphere in hemispheres:
    # Use Beautiful Soup's find() method to navigate and retrieve "Title" and link to next page (link2)
    description = hemisphere.find('div', class_='description')
    link = description.find('a')
    href = link['href']
    title = link.find('h3').text
    
    #create second link, navigate to, and create new BeautifulSoup object
    link2 = "https://astrogeology.usgs.gov" + href
    response2 = requests.get(link2)
    browser.visit(link2)
    soup2 = BeautifulSoup(response2.text, 'html.parser')
    
    #Retreive "img_url"
    downloads = soup2.find('div', class_='downloads')
    a = downloads.find('a')
    img_url = a['href']
    
    #Append Lists with title and img_url
    hemisphere_titles.append(title)
    hemisphere_image_urls.append(img_url)
    
    #Visit the "img_url" for the funz
    browser.visit(img_url)
    
    print('-----------')
    print(title)
    print(link2)
    print(img_url)
    
print("Scraping Complete") 

return hemisphere_titles
return hemisphere_image_urls


