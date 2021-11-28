from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#creat a team 
# http --verbose POST localhost:5300/Teams/ TeamName="test" User_id="4" Size="3"
@route('/Teams/', method='POST')
def CreateTeam(TeamsDB):
    Payload = request.json
    statement = '''
            INSERT INTO Teams(TeamName,Size) VALUES
            (:TeamName,:Size)
            '''
    Team = root.PostMethod(TeamsDB,statement,{'TeamName','Size'})
    if not Team:
     abort(404)
    
    stmt = '''INSERT INTO Members(MUser_id,MTeam_id,Member_Role) VALUES (?,?,?)'''
    root.execute(TeamsDB,stmt,[Payload['User_id'],Team.body['id'], 4])
    
    return Team

# list all teams that user joinned 
# http --verbose GET localhost:5300/Teams/1 

@route('/Teams/<User_id>', method='GET')
def ListUserTeam(User_id,TeamsDB):
    Teams = root.query(TeamsDB, 'select Team_id, TeamName, Size from Teams where Team_id IN (select MTeam_id from Members where MUser_id = ?)',[User_id])
    if not Teams:
        abort(400)
    rep = {'Teams': Teams}    
    return HTTPResponse(rep,200)

# list all members of a team
# http --verbose GET localhost:5300/Members Team_id="1"
@route('/Members', method='POST')
def ListMembers(TeamsDB):
    MTeam_id = request.json
    Members = root.query(TeamsDB, 'select Member_id,MUser_id, Member_Role from Members where MTeam_id =? ',[MTeam_id['Team_id']])
    if not Members:
        abort(400)
    # get role 
    for Member in Members:
        stand_roles = root.query(TeamsDB, 'select Title from Roles where Role_id =? ',[Member['Member_Role']], one= True)
        Member['Member_Role'] = stand_roles['Title']
    rep = {'Members': Members}    
    return HTTPResponse(rep,200)
# user joins team
#http --verbose POST localhost:5300/Members/ Team_id="1" User_id="2" Title="DEVELOPER"
@route('/Members/', method='POST')
def JoinTeam(TeamsDB):
    payload= request.json
    if not payload:
        abort(400)
    posted_fields = payload.keys()
    required_fields = {'User_id','Team_id','Title'}
    role = root.query(TeamsDB, 'select Role_id from Roles where Title =? ',[payload['Title']], one=True)
    if not role:
     abort(404)
    payload['Member_Role'] = role['Role_id']
    stmt = '''INSERT INTO Members(MUser_id,MTeam_id,Member_Role) VALUES (:User_id,:Team_id,:Member_Role)'''
    Member_id = root.execute(TeamsDB,stmt,payload)
    if not Member_id:
        abort(400)
    rep = {'Member_id': Member_id}    
    return HTTPResponse(rep,201)

# quit team 
#http --verbose DELETE localhost:5300/Members/Quit  team_id="3" user_id=''

@route('/Members/Quit', method='DELETE')
def JoinTeam(TeamsDB):
    member = request.json
    print(member)
    if not member:
     abort(400)
   
    reponse = root.query(TeamsDB, 'DELETE FROM Members WHERE MTeam_id = ? AND MUser_id=?  ',[member['team_id'], member['user_id']], one=True)
  
    return HTTPResponse(reponse,200)
