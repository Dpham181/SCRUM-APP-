from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#creat a team 
# http --verbose POST localhost:5300/Teams/ TeamName="test" User_id="4"
@route('/Teams/', method='POST')
def CreateTeam(TeamsDB):
    statement = '''
            INSERT INTO Teams(TeamName) VALUES
            (:TeamName)
            '''
    Team = root.PostMethod(TeamsDB,statement,{'TeamName'})

    stmt = '''INSERT INTO Members(MUser_id,MTeam_id,Member_Role) VALUES (?,?,?)'''
    stmt_ReqKeys ={'MUser_id','MTeam_id','Member_Role'}
    Team.body['role'] = 3
    Product_Onwer = root.execute(TeamsDB,stmt,[Team.body])

    if not Product_Onwer:
     abort(404)
    return Product_Onwer

#todo 
# after having a team then assign Product onwer role to the user that created the team.
    
    Product_onwer['Member_id'] = root.execute(TeamsDB, stmt,Member)
    if not Product_onwer:
        abort(404)
    
    return Product_onwer

# list all team that user joinned 
# http --verbose GET localhost:5300/Teams/1 

@route('/Teams/<User_id>', method='GET')
def GetProductBL(User_id,TeamsDB):
    Teams = root.query(TeamsDB, 'select TeamName from Teams where Team_id =(select MTeam_id from Members where MUser_id = ?)',[User_id])
    if not Teams:
        abort(400)
    rep = {'Teams': Teams}    
    return HTTPResponse(rep,200)

