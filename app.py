import os
from flask import Flask, Response
from json import dumps

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/data/<path:memeurl>')
def josh(memeurl):
    return Response(dumps({'arg': memeurl}), mimetype='application/json')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
