#!/usr/bin/env python
# coding: utf-8
import sys
import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from pymongo import UpdateOne
import threading
import pymongo

client = pymongo.MongoClient("mongodb+srv://ste519:123@cluster0-9uig7.mongodb.net/test?retryWrites=true")
db = client.test

# 1. Instagram

#Ins pages
ins_links = ['https://www.instagram.com/midianinja/',
             'https://www.instagram.com/jornalistaslivres/?hl=pt',
             'https://www.instagram.com/movimentosemterra/',
             'https://www.instagram.com/mtstbrasil/',
             'https://www.instagram.com/psol50/?hl=pt',
             'https://www.instagram.com/nocautegram/?hl=pt'
             'https://www.instagram.com/guilhermeboulos.oficial/?hl=pt'
              #add more here
            ]

#The following code will scrape the most current 12 posts from each account
def scrap_ins (link):

    page_content = requests.get(link)
    soup = BeautifulSoup(page_content.content,'html.parser')

    script = soup.find('script', text=lambda t: t.startswith('window._sharedData'))
    page_json = script.text.split(' = ', 1)[1].rstrip(';')
    data = json.loads(page_json)

    # User info
    user =  data['entry_data']['ProfilePage'][0]['graphql']['user']
    username = user['username']
    profile_pic = user['profile_pic_url']
    user_info = {"profile_pic": profile_pic, 'user_name': username}

    # Posts
    for post in user['edge_owner_to_timeline_media']['edges']:

        comments = post['node']['edge_media_to_comment']['count']
        likes = post['node']['edge_liked_by']['count']
        img = post['node']['display_url']
        uid = post['node']['id']
        time = post['node']['taken_at_timestamp']
        url = "https://www.instagram.com/p/" + post['node']['shortcode']

        if len(post['node']['edge_media_to_caption']['edges'])==0:
            caption = None
        else:
            caption = post['node']['edge_media_to_caption']['edges'][0]['node']['text']

        db.ins.update_one({'_id': url},
                           {"$set":{'user': username,
                            'profile_pic': profile_pic,
                            'time':datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S'),
                            'image': img,
                            'comments': comments,
                            'likes': likes,
                            'caption':caption}},
                            upsert=True)

    return;

# def scraping():
#     threading.Timer(600.0, scraping).start()
#     try:
#         for link in ins_links:
#             scrap_ins(link)
#         print ('Succeeded.')
#     except:
#         print ('An error occurred.')
#     return;

# scraping();

try:
    for link in ins_links:
        scrap_ins(link)
    print ('Succeeded.')
    sys.stdout.flush()
except:
    print ('An error occurred.')
    sys.stdout.flush()

##Dump the json
# with open ('test.json', 'w') as fp:
#     json.dump(ins_posts, fp, indent = 4)
