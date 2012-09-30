import os
from flask import Flask, Response, render_template
from json import dumps
from bitly.bitly_client import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('template.html')

@app.route('/data/<path:memeurl>')
def data(memeurl):
    rep = getBitlyRep(memeurl)
    
    created = getBitlyCreated(rep['hash'], rep['short_url'])
    history = getURLClickHistory(rep['short_url'], unit='day', units=100)
    
    clicks = []
    time = []
    for clickdata in history['data']['link_clicks']:
        if clickdata['dt'] < created:
            continue
        clicks.append(clickdata['clicks'])
        time.append(clickdata['dt'])

    return Response(dumps({'x':time, 'y':clicks, 'created':created}), mimetype='application/json')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)
