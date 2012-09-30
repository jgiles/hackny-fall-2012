#!/usr/local/bin/python
"""
This is a wrapper around the Twitter API
"""

import httplib
import json
import urllib
import sys
sys.path.append('./tweepy/')
import tweepy

TWITTER_CONSUMER_KEY = 'ibLklkaZ5KDmXi1xHidMdA'
TWITTER_CONSUMER_SECRET = 'cuITdEr3xVQlQApc65ZzkFBAtqaY6lP5DT5lItwY'
TWITTER_ACCESS_TOKEN = '329712589-3dSBs3N4FyZyxb5lJhQSvdXzqw0Cg2p8ajJPtjbO'
TWITTER_TOKEN_SECRET = 'WYHqkQYxCmJdf9YhsPYvyo0uRg92rdZduHvBtMXszs'

# searchTweetsByQuery: query --> list of matching tweeets 
def searchTweetsByQuery(query, end_date=None):
	auth = tweepy.OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
	auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_TOKEN_SECRET)
	twitter_api = tweepy.API(auth, parser=tweepy.parsers.RawParser())
	data = twitter_api.search(q=query, rpp = 100)
	data_dict = json.loads(data)
	rawTweets = data_dict["results"]
	
	return rawTweets

# getUserLocation: user_id --> userLocation
def getUserLocation(user_id):
	auth = tweepy.OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
	auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_TOKEN_SECRET)
	twitter_api = tweepy.API(auth, parser=tweepy.parsers.RawParser())
	data = twitter_api.get_user(user_id)
	data_dict = json.loads(data)
	location = data_dict['location']
	return location

def getRetweets(status_id):
	auth = tweepy.OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
	auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_TOKEN_SECRET)
	twitter_api = tweepy.API(auth, parser=tweepy.parsers.RawParser())
	data = twitter_api.retweets(status_id, count=100)
	data_dict = json.loads(data)
	return data_dict
	
# getLocationCoords: location string --> lat lng
#def getLocationCoords(location):
	
def getTweetsByScreenname(screen_name):
	auth = tweepy.OAuthHandler(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
	auth.set_access_token(TWITTER_ACCESS_TOKEN, TWITTER_TOKEN_SECRET)
	twitter_api = tweepy.API(auth, parser=tweepy.parsers.RawParser())
	data = twitter_api.user_timeline(screen_name, count=200,include_rts="false")
	data_dict = json.loads(data)
	print data_dict
	return data_dict

# getReferringDomains: bitly_url --> dict of referring domains
def getReferringDomains(bitly_url, unit=None, units=None, limit=None, unit_reference_ts=None):
	connection = httplib.HTTPSConnection("api-ssl.bitly.com")
	get_param_dict = {
						"access_token" : BITLY_ACCESS_TOKEN,
						"link" : bitly_url,
						"limit": 1000
						}
	get_param_string = urllib.urlencode(get_param_dict)

	connection.request("GET", "/v3/link/referring_domains?%s" % get_param_string)
	response = connection.getresponse()
	data = response.read()
	return data

gangnam_tweets = searchTweetsByQuery("http://t.co/KboJd2OO")
#tweet = tweets[0]
katy_tweets = getTweetsByScreenname("katyperry")

retweets = getRetweets(237841455782182912L)
for tweet in retweets:
	try:
		print tweet['user']['name']
	except:
		continue
#kt = katy_tweets[0]
#print + kt['user']['id']

#tweets.reverse()
#for tweet in tweets:
#	print tweet
#	print '\n'
#	if tweet['created_at']:
#		print 'Timestamp: ' + tweet['created_at']
#	if tweet['from_user']:
#		print 'From: ' + tweet['from_user']
#	if tweet['to_user_name']:
#		print 'To: ' + tweet['to_user_name']
#	if tweet['text']:
#		print 'Message: ' + tweet['text']
#	if tweet['from_user_id']:
#		print 'From ID: ' + tweet['from_user_id_str']
#	try:
#		print getUserLocation(tweet['from_user_id'])
#	except:
#		continue
#	print 


#getUserLocation(20034298)
