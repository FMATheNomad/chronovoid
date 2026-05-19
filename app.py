import math
import time
from datetime import datetime
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/simulate')
def simulate():
    return render_template('simulate.html')

@app.route('/api/time')
def api_time():
    now = time.time()
    frac, whole = math.modf(now)
    microseconds = int(frac * 1_000_000)
    dt = datetime.fromtimestamp(now)
    return jsonify({
        'iso': dt.isoformat(),
        'unix': now,
        'seconds': int(whole),
        'microseconds': microseconds,
        'precision': 'microsecond'
    })


"""
PythonAnywhere Setup:
1. Upload this project to your PythonAnywhere account
2. Go to Web tab -> Add a new web app -> Manual configuration -> Python 3.x
3. In the WSGI configuration file, add:
   import sys
   sys.path.insert(0, '/home/YOUR_USERNAME/chronovoid')
   from app import app as application
4. Install Flask in a virtualenv or use --user flag:
   pip3.11 install --user flask
5. Reload the web app
6. Access at: https://YOUR_USERNAME.pythonanywhere.com
"""

if __name__ == '__main__':
    app.run()
