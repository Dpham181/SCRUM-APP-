from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#creat a team 
# http --verbose POST localhost:5300/Teams/ TeamName="test" User_id="4" Size="3"
@route('/Teams/', method='POST')
def CreateTeam(TeamsDB):
    statement = '''
            INSERT INTO Teams(TeamName) VALUES
            (:TeamName,:Size)
            '''
    Team = root.PostMethod(TeamsDB,statement,{'TeamName'})

    stmt = '''INSERT INTO Members(MUser_id,MTeam_id,Member_Role) VALUES (?,?,?)'''
    stmt_ReqKeys ={'MUser_id','MTeam_id','Member_Role'}
    Team.body['role'] = 4
    Team.body['Member_id'] = root.execute(TeamsDB,stmt,[Team.body['User_id'],Team.body['id'], Team.body['role']])

    if not  Team.body:
     abort(404)
    return  Team.body

# after having a team then assign Product onwer role to the user that created the team.
    
    Product_onwer['Member_id'] = root.execute(TeamsDB, stmt,Member)
    if not Product_onwer:
        abort(404)
    
    return Product_onwer

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
@route('/Members', method='GET')
def ListMembers(TeamsDB):
    MTeam_id = request.json
    Members = root.query(TeamsDB, 'select Member_id,MUser_id, Member_Role from Members where MTeam_id =? ',[MTeam_id['Team_id']])
    if not Members:
        abort(400)
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