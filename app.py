import os
from flask import Flask, Response, render_template
from json import dumps
from bitly.bitly_client import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('template.html')

@app.route('/data/<path:memeurl>')
def josh(memeurl):
    shortlink = getBitlyShortURL(memeurl)
    history = getURLClickHistory(shortlink, unit='day', units=7)
    return Response(dumps(history), mimetype='application/json')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)
