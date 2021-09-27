from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#signup user 
#http --verbose POST localhost:5100/Users/ UserName="test6" PassWord="123"
@route('/Users/', method='POST')
def createUser(UsersDB):
    statement = '''INSERT INTO users(UserName,PassWord) VALUES(:UserName, :PassWord)'''
    rep = root.PostMethod(UsersDB,statement,{'UserName','PassWord'})
    return rep

#authenticate user
#http --verbose POST localhost:5100/auth/ UserName="DANH" PassWord="123"

@route('/auth/', method='POST')
def checkPassword(UsersDB):
    user = request.json
    print(user)
    userpassword = root.query(UsersDB, 'SELECT PassWord FROM users WHERE UserName = ?;' ,[user['UserName']], one = True);
    if not userpassword:
        return HTTPResponse({'Authentication':False},404)
    if userpassword['PassWord'] == user['PassWord']:
        return HTTPResponse({'Authentication':True},200)
    return HTTPResponse({'Authentication':False},401)


