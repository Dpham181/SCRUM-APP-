from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#creat a team 
# http --verbose POST localhost:5300/Teams/ TeamName="test" 
@route('/Teams/', method='POST')
def CreateTeam(TeamsDB):
    Team = request.json

    if not Team:
        abort(400)
    
    try:
        Team['Team_id'] = root.execute(TeamsDB, '''
            INSERT INTO Teams(TeamName) VALUES
            (:TeamName)
            ''', Team)
       
    except sqlite3.IntegrityError as e:
        abort(409, str(e))

    response.status = 201
    return Team

# list all team that user joinned 
# http --verbose GET localhost:5300/Teams/1 

@route('/Teams/<User_id>', method='GET')
def GetProductBL(User_id,TeamsDB):
    Teams = root.query(TeamsDB, 'select TeamName from Teams where Team_id =(select MTeam_id from Members where MUser_id = ?)',[User_id])
    if not Teams:
        abort(400)
    rep = {'Teams': Teams}    
    return HTTPResponse(rep,200)

