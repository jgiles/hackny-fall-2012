from __future__ import division

import os
from flask import Flask, Response, render_template
from json import dumps
from bitly.bitly_client import *
from random import random
from store import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('template.html')

@app.route('/data/<path:memeurl>')
def data(memeurl):
    units = 365
    rep = getBitlyRep(memeurl)
    
    created = getBitlyCreated(rep['hash'], rep['short_url'])
    history = getURLClickHistory(rep['short_url'], unit='day', units=units)
    refs = getReferringDomains(rep['short_url'], unit='day', units=units)['data']['referring_domains']

    clicks = []
    time = []
    for clickdata in history['data']['link_clicks']:
        if clickdata['dt'] < created:
            continue
        clicks.append(clickdata['clicks'])
        time.append(clickdata['dt'])        
    time.reverse()
    clicks.reverse()

    top = 6
    if len(refs) < top:
        top = len(refs)
    featured = {}
    try:
        records = recall_records(memeurl)
        for i in range(0, top):
            ref = refs[i]
            try:
                featured[ref['domain']] = records[ref['domain']][-len(clicks):]
            except:
                continue
        
        for feat in featured:
            for i in range(0, len(featured[feat])):
                try:
                    ratio = featured[feat][i]/clicks[i]
                except:
                    ratio = 0
                featured[feat][i] = ratio
    except:
        featured = {}
    return Response(dumps({'x':time, 'y':clicks, 'referrers':featured, 'created':created}), mimetype='application/json')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)
