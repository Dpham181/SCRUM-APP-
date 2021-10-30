from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#Make Project 
#http --verbose POST localhost:5200/Projects/ Team_id="4" Title="testing project" description="this is a test"
@route('/Projects/', method='POST')
def MakeProject(PojectsDB):
    statement = '''
           INSERT INTO projects(Title,description)
            VALUES(:Title, :description)
            '''
    project = root.PostMethod(PojectsDB,statement,{'Team_id','Title', 'description'})
    
    return project

#list all the user's projects 

def ListProjects():

   

    # team id already offers in front end 
    # list all the project that the team does
     # by given team id now we can do nested query of teamproject to get back the project as whole
    return null