from flask import Flask, escape, request, render_template, make_response, url_for, redirect, jsonify
from UserDatabase import UserDatabase
app = Flask(__name__)

usr_db = None

LOGIN = 'login.html'
INDEX = 'mainPage.html'
SIGNUP = 'signup.html'
CREATEITEM = 'createItem.html'

def initialize_vars():
	global usr_db
	usr_db = UserDatabase()

@app.route('/')
def frontPage():
   return (redirect(url_for('login')))

@app.route('/login', methods=['POST', 'GET'])
def login():
   if request.method == 'POST':
      if (usr_db.login(request.form['user'], request.form['pass'])):
         usr = request.form['user']
         print('should be directing to main page')
         resp = redirect(url_for('mainPage'))
         resp.set_cookie('user', request.form['user'])
         resp.set_cookie('pass', request.form['pass'])
         return resp
      else:
         return render_template(LOGIN, error='wrong login')
   else:
      return render_template(LOGIN)

@app.route('/signup', methods=['POST', 'GET'])
def signup():
   if request.method == 'POST':
      ilist = [request.form['pass'], request.form['gender'], request.form['age'], request.form['role'], request.form['access']]
      usr_db.add_user(request.form['user'], ilist)
      return (redirect(url_for('login')))
   else:
      return render_template(SIGNUP)

@app.route('/createItem', methods=['POST', 'GET'])
def items():
   if request.method == 'POST':
      usr_db.createItem(request.json)
   else:
      return render_template(CREATEITEM)

@app.route('/mainPage', methods=['POST', 'GET'])
def mainPage():
   if request.method == 'POST':
      usr_db.add_room(request.get_json(force=True))
   return render_template(INDEX)

@app.route('/rooms', methods=['GET'])
def getRooms():
   usr_db.getRooms()
   print(usr_db.getRooms())
   return(jsonify(usr_db.getRooms()))

if __name__ == '__main__':
   initialize_vars()
   app.run()
