import json
import os.path
from os import path

class UserDatabase:
	def __init__(self):
		self.ufile = 'usrdata.db'
		self.ACCESS_CODE = ["fgf76"]

	def login(self,usr, pss):
		f = open(self.ufile, 'r')
		data = f.readlines()
		f.close()
		for i in data:
			if (i.split()[0] == usr):
				if (i.split()[1] == pss):
					return True
				else:
					return False
		return False

	def add_user(self, usr, ilist):
		f = open(self.ufile, 'a')
		for i in ilist:
			usr += ' ' + i
		f.write(usr + '\n')
		f.close()
		f = open(usr + 'eat.db', 'w')
		f.close()
		return True

	def add_room(self, jso):
		print('adding a room')
		f = open(jso["roomName"] + '.db', 'w')
		strng = ""
		strng += jso["gps"] + '\n'
		for i in jso['items']:
			s = ""
			for j in i:
				s += i[j] + ' '
			strng += s + '\n'
		print(strng)
		f.write(strng)
		f.close()

	def createItem(self, jso):
		f = open(jso["room"] + '.db', 'a')
		strng = ""
		for i in jso:
			strng += i[j] + ' '
		strng += s + '\n'
		f.write(strng)
		f.close()
