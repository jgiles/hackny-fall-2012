#!/usr/local/bin/python
"""
This is a wrapper around the goo.gl API
"""

import sys
import httplib
import urllib

GOOGLE_URL_API_KEY = 'AIzaSyAS453DRrPi_Q59CmtLXr_geIu0Dd3gUcg'

# getGoogleGlobalHash: long_url --> bitly global hash
def getGoogleGlobalHash(long_url):
	connection = httplib.HTTPSConnection("www.googleapis.com")
	get_param_dict = {
						'key' : GOOGLE_URL_API_KEY,
						'longUrl' : long_url
						}
	short_url = long_url
	return short_url

# getGoogleLatLon: address --> lat, lon
def getGoogleLatLon(address):
	connection = httplib.HTTPConnection("maps.googleapis.com")
	get_param_dict = {
						'address' : address,
						'key' : GOOGLE_URL_API_KEY
						}
	get_param_string = urllib.urlencode(get_param_dict)
	connection.request("POST", "/maps/api/geocode/json?%s" % get_param_string, headers={'Content-length': len(get_param_dict)})
	response = connection.getresponse()
	data = response.read()
	print data

# getGoogleShortURL: long_url --> bitly short URL (with global hash)
def getGoogleShortURL(long_url):
	# Make sure has protocol
	if "http://" not in long_url:
		if "https://" not in long_url:
			long_url = "http://" + long_url
	# Make connection
	connection = httplib.HTTPSConnection("www.googleapis.com")
	get_param_dict = {
						'key' : GOOGLE_URL_API_KEY,
						'longUrl' : long_url
						}
						
	get_param_string = urllib.urlencode(get_param_dict)
	# Make request and return data
	connection.request("POST", "/urlshortener/v1/url?%s" % get_param_string)
	response = connection.getresponse()
	data = response.read()
	print data
#	return short_url

# getCanonicalURL: bitly_url --> long URL
def getCanonicalURL(bitly_url):
	bitly = bitly_api.Connection(BITLY_API_USERNAME, BITLY_API_KEY)
	canonical_url_data = bitly.expand(shortUrl=bitly_url)
	canonical_url = canonical_url_data[0]['long_url']
	return canonical_url

# getUrlClickHistory: bitly_url --> dictionary of total click history
def getURLClickHistory(bitly_url, unit=None, units=None, limit=None, unit_reference_ts=None):
	connection = httplib.HTTPSConnection("api-ssl.bitly.com")
	get_param_dict = {
						"access_token" : BITLY_ACCESS_TOKEN,
						"link" : bitly_url,
						"rollup" : "false",
						"limit" : 1000
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
		get_param_dict.update({"unit_reference_ts" : units_reference_ts})

	get_param_string = urllib.urlencode(get_param_dict)

	connection.request("GET", "/v3/link/clicks?%s" % get_param_string)
	response = connection.getresponse()
	data = response.read()
	return data


#short_url = getGoogleShortURL('http://www.youtube.com/watch?v=9bZkp7q19f0')
getGoogleLatLon('Tunbridge Wells')
