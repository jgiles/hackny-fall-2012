#!/usr/local/bin/python
"""
This is a py.test script
"""
import sys
sys.path.append('../')
import bitly_api

def testApi():
	bitly = bitly_api.Connection('santhoshbala','R_0859e5a80d970b6b59e9e76acfa997b0')
	params = {
		'login': 'santhoshbala',
		'apiKey': 'R_0859e5a80d970b6b59e9e76acfa997b0',
		'hash': 'OwhQIF',
		'unit': 'month'
	}
	host = 'api.bit.ly'
	data = bitly._call(host, 'v3/clicks', params, None)
	#data = bitly.shorten('http://google.com/')
	print data

testApi()
