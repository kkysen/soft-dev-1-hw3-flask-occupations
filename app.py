#!/usr/bin/python

"""
Khyber Sen
SoftDev1 pd7
HW4 -- Fill Up Yer Flask
2017-09-22
"""

__author__ = 'Khyber Sen'
__date__ = '2017-09-22'

from flask import Flask
from flask import render_template
from flask_compress import Compress

from minify import minify
from occupations import Occupations

occupations = Occupations.in_united_states()

app = Flask(__name__)


@app.route('/occupations')
def render_occupations():
    # type: () -> str
    return render_template('occupations.jinja2', occupations=occupations,
                           random_occupation=occupations.random_occupation())


if __name__ == '__main__':
    app.debug = True
    # minify(app)
    Compress(app)
    app.run()
