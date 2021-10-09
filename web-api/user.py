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
#signup profile 
@route('/Users/Profile/', method='POST')
def createUserProfile(UsersDB):
    stmt = ''' INSERT INTO Profiles(PUSER_ID,FIRST_NAME,LAST_NAME,COUNTRY,ZIPCODE,CITY,STREET,STATE) VALUES (:PUSER_ID,F:FIRST_NAME,:LAST_NAME,:COUNTRY,:ZIPCODE,:CITY,:STREET,:STATE) '''

    rep = root.PostMethod(UsersDB,stmt,{'PUSER_ID','FIRST_NAME','LAST_NAME','COUNTRY','ZIPCODE','CITY','STREET','STATE'})
   
    return rep
#authenticate user
#http --verbose POST localhost:5100/auth/ UserName="DANH" PassWord="123"

@route('/auth/', method='POST')
def checkPassword(UsersDB):
    user = request.json
    print(user)
    userpassword = root.query(UsersDB, 'SELECT User_id, PassWord FROM users WHERE UserName = ?;' ,[user['UserName']], one = True);
    if not userpassword:
        return HTTPResponse({'Authentication':False},404)
    if userpassword['PassWord'] == user['PassWord']:
        return HTTPResponse({"User_id":userpassword['User_id']},200)
    return HTTPResponse({'Authentication':False},401)

# user profile 
@route('/Users/Profile', method='GET')
def ListUserTeam(UsersDB):
    User_id = request.query.id
    Profile = root.query(UsersDB, 'select FIRST_NAME,LAST_NAME,COUNTRY,ZIPCODE,CITY,STREET,STATE from Profiles where PUSER_ID =?',[User_id])
    if not Profile:
        abort(400)
    rep = {'Profile': Profile}    
    return HTTPResponse(rep,200)