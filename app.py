#!/usr/bin/python

"""
Khyber Sen and Michael Ruvinshteyn
SoftDev1 pd7
HW5 -- ... and Now Enjoy Its Contents
2017-09-26
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
    return render_template(
        'occupations.jinja2',
        title='US Occupations',
        occupations=occupations,
        random_occupation=occupations.random_occupation())


if __name__ == '__main__':
    app.debug = True
    # minify(app)
    Compress(app)
    app.run()
