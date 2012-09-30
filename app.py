import os
from flask import Flask, Response, render_template
from json import dumps
from bitly.bitly_client import *
from random import random

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
    referrals = getReferringDomains(rep['short_url'], unit='day', units=units)
    return Response(dumps(referrals, indent=4), mimetype = 'application/json')
    clicks = []
    time = []
    z = []
    for clickdata in history['data']['link_clicks']:
        if clickdata['dt'] < created:
            continue
        clicks.append(clickdata['clicks'])
        time.append(clickdata['dt'])
        z.append(clickdata['clicks']*(.8 + .4*random()))

    return Response(dumps({'x':time, 'y':clicks, 'z':z, 'created':created}), mimetype='application/json')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)
