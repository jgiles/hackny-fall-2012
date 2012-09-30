#!/usr/local/bin/python
"""
This is a wrapper around official bitly python client
"""

import sys
import bitly_api
import httplib
import urllib

BITLY_DOMAIN = 'https://api-ssl.bitly.com/'
BITLY_API_USERNAME = 'santhoshbala'
BITLY_API_KEY = 'R_0859e5a80d970b6b59e9e76acfa997b0'
BITLY_CLIENT_ID = '136f344b5c1c448e3e50f346ac881c67cc80bf08'
BITLY_CLIENT_SECRET = '3bc86abcb18dc591bdad3e77c2f111aac3cefc4d'
BITLY_ACCESS_TOKEN = '62eb874c179af79fd631b254edc163c701dac002'

def getBitlyGlobalHash(long_url):
	bitly = bitly_api.Connection(BITLY_API_USERNAME, BITLY_API_KEY)
	short_url_data = bitly.shorten(long_url)
	short_url = short_url_data['global_hash']
	return short_url

def getBitlyShortURL(long_url):
	bitlyHash = getBitlyGlobalHash(long_url)
	short_url = "http://bit.ly/%s" % bitlyHash  
	return short_url

def getCanonicalURL(bitly_url):
	bitly = bitly_api.Connection(BITLY_API_USERNAME, BITLY_API_KEY)
	canonical_url_data = bitly.expand(shortUrl=bitly_url)
	canonical_url = canonical_url_data[0]['long_url']
	return canonical_url

# "link" is a short_url
def getUrlClickHistory(link, unit=None, units=None, limit=None, unit_reference_ts=None):
	connection = httplib.HTTPSConnection("api-ssl.bitly.com")
	get_param_dict = {
						"access_token" : BITLY_ACCESS_TOKEN,
						"link" : link,
						"rollup" : "false"
						}
	if (unit):
		print unit
		get_param_dict.update({"unit" : unit})
	if (units):
		print units
		get_param_dict.update({"units" : units})
	if (limit):
		get_param_dict.update({"limit" : limit})
	if (unit_reference_ts):
		get_param_dict.update({"unit_reference_ts" : units})

	get_param_string = urllib.urlencode(get_param_dict)

	connection.request("GET", "/v3/link/clicks?%s" % get_param_string)
	response = connection.getresponse()
	data = response.read()
	return data

def getURLCountryReferrers(bitly_link, unit=None, units=None, limit=None, unit_reference_ts=None):
	connection = httplib.HTTPSConnection("api-ssl.bitly.com")
	get_param_dict = {
						"access_token" : BITLY_ACCESS_TOKEN,
						"link" : bitly_link,
						}
	if (unit):
		print unit
		get_param_dict.update({"unit" : unit})
	if (units):
		print units
		get_param_dict.update({"units" : units})
	if (limit):
		get_param_dict.update({"limit" : limit})
	if (unit_reference_ts):
		get_param_dict.update({"unit_reference_ts" : units})

	get_param_string = urllib.urlencode(get_param_dict)

	connection.request("GET", "/v3/link/countries?%s" % get_param_string)
	response = connection.getresponse()
	data = response.read()
	return data
	
	
	
	
short_url = getBitlyShortURL('http://www.youtube.com/watch?v=9bZkp7q19f0')
#print short_url
#data = getUrlClickHistory(short_url, unit="minute", units=60)
#print data
#data = getUrlClickHistory(short_url, unit="hour", units=24)
#print data
#data = getUrlClickHistory(short_url, unit="week", units=1000)
#print data
#long_url = getCanonicalURL(short_url)
#print long_url
#data = getURLCountryReferrers(short_url, unit="minute", units=2)
#print data
#data = getURLCountryReferrers(short_url, unit="hour", units=2)
#print data
#data = getURLCountryReferrers(short_url, unit="week", units=2)
#print data
