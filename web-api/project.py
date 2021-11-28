from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#Make Project 
#http --verbose POST localhost:5200/Projects/ Team_id="4" Title="testing project" description="this is a test"
@route('/Projects/', method='POST')
def MakeProject(PojectsDB):
        TPTeam_id = request.json

    statement = '''
           INSERT INTO projects(Title,description)
            VALUES(:Title, :description)
            '''
    project = root.PostMethod(PojectsDB,statement,{'Team_id','Title', 'description'})
    
    return project

#list all the user's projects 
#http --verbose POST localhost:5200/Projects TPTeam_id="4"
 # team id already offers in front end 
    # list all the project that the team does
     # by given team id now we can do nested query of teamproject to get back the project as whole
 


@route('/Projects', method='POST')
def ListProjects(PojectsDB):
    TPTeam_id = request.json
    print(TPTeam_id)
    Projects = root.query(PojectsDB, 'select Title, description, Deathline from Projects where Project_id IN (select TPproject_id from  TeamProjects where TPteam_id = ?)',[TPTeam_id['id']])
    if not Projects:
        abort(400)
    print(Projects)
    rep = {'Projects': Projects}    
    return HTTPResponse(rep,200)
   