import pymongo
from pymongo import Connection
from bitly.bitly_client import *
from json import loads

def get_collection():
    connection = Connection('mongodb://memepath:password@alex.mongohq.com:10075/hackny')
    coll = connection.hackny.memestats
    return coll

def get_referrer_records(url, units=10):
    unit = 'day'
    rep = getBitlyRep(url)
    
    domains = {}
    subtotals = {}
    for i in range(2, units):
        result = getReferringDomains(rep['short_url'], unit=unit, units=i)
        referrers = result['data']['referring_domains']
        for ref in referrers:
            try:
                domain = ref['domain']
            except:
                continue
            try:
                stats = domains[domain]
            except:
                stats = []
                subtotals[domain] = 0
            stats.extend([0]*(i - 1 - len(stats)))
            stats.append(ref['clicks'] - subtotals[domain])
            subtotals[domain] = ref['clicks']
            domains[domain] = stats
    return domains

def escape_periods(key):
    return key.replace('#', '##').replace('.', '#0')

def unescape_periods(key):
    return key.replace('#0', '.').replace('##', '#')
    
def store_records(url, refs):
    clean_refs = {}
    for domain in refs:
        clean_refs[escape_periods(domain)] = refs[domain]
        clean_refs[escape_periods(domain)].reverse()
    doc = {'domain':url, 'referrals':clean_refs}
    print doc
    coll = get_collection()
    coll.insert(doc)

def recall_records(url):
    coll = get_collection()
    clean_refs = coll.find({'domain': url})[0]['referrals']
    refs = {}
    for clean_domain in clean_refs:
        refs[unescape_periods(clean_domain)] = clean_refs[clean_domain]
    return refs
