from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#Make Project 
#http --verbose POST localhost:5200/Projects/ Team_id="4" Title="testing project" description="this is a test"
@route('/Projects/', method='POST')
def MakeProject(PojectsDB,TeamsDB):
    print('here')
    statement ='''
           INSERT INTO projects(Title,description,DeathLine)
            VALUES(:Title, :description,:deathline)
            '''

    statement2 ='''INSERT INTO TeamProjects(TPProject_id,TPTeam_id, Contribution_Role) VALUES (?,?,?)'''
    project = root.PostMethod(PojectsDB,statement,{'Title','description', 'deathline'})
    print(project)
    
    teamproject = root.execute(PojectsDB, statement2,[project.body['id'],project.body['Teamid'],'tester'])
    
    
    print(teamproject)
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
    Projects = root.query(PojectsDB, 'select Project_id,Title, description, Deathline from Projects where Project_id IN (select TPproject_id from  TeamProjects where TPteam_id = ?)',[TPTeam_id['id']])
    if not Projects:
        abort(400)
    print(Projects)
    rep = {'Projects': Projects}    
    return HTTPResponse(rep,200)


# getting details of specifit project
#http --verbose get localhost:5200/Project/1

@route('/Projects/<project_id>', method='GET')
def getProject(PojectsDB,project_id ):
    Project = root.query(PojectsDB, 'select Title, description, Deathline from Projects where Project_id =?',[project_id])
    if not Project:
        abort(400)
    print(Project)
    rep = {'Project': Project}    
    return HTTPResponse(rep,200)
     