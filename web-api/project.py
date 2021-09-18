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



