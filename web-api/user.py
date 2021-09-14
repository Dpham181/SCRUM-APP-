from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#signup user 
#http --verbose POST localhost:5100/Users/ UserName="test6" PassWord="123
@route('/Users/', method='POST')
def createUser(UsersDB):
    user = request.json

    if not user:
        abort(400)

    posted_fields = user.keys()
    required_fields = {'UserName', 'PassWord'}

    if not required_fields <= posted_fields:
        abort(400, f'Missing fields: {required_fields - posted_fields}')

    try:
        user['User_id'] = root.execute(UsersDB, '''
           INSERT INTO users(UserName,PassWord)
            VALUES(:UserName, :PassWord)
            ''', user)
    except sqlite3.IntegrityError as e:
        abort(409, str(e))

    response.status = 201
    response.set_header('Location', f"/users/{user['User_id']}")
    return user

#authenticate user
@route('/auth/', method='POST')
def checkPassword(UsersDB):
    user = request.json
    userpassword = root.query(UsersDB, 'SELECT PassWord FROM users WHERE UserName = ?;' ,[user['username']], one = True);
    if not userpassword:
        return HTTPResponse({'Authentication':False},404)
    if userpassword['PassWord'] == user['password']:
        return HTTPResponse({'Authentication':True},200)
    return HTTPResponse({'Authentication':False},401)


