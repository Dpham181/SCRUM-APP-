from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#Make Project 
#http --verbose POST localhost:5200/Projects/ Team_id="4" Title="testing project" description="this is a test"
@route('/Projects/', method='POST')
def MakeProject(PojectsDB):
    payload = request.json

    if not payload:
        abort(400)

    posted_fields = payload.keys()
    required_fields = {'Team_id','Title', 'description'}

    if not required_fields <= posted_fields:
        abort(400, f'Missing fields: {required_fields - posted_fields}')

    try:
        payload['Project_id'] = root.execute(PojectsDB, '''
           INSERT INTO projects(Title,description)
            VALUES(:Title, :description)
            ''', payload)
        root.execute(PojectsDB,'''
            INSERT INTO TeamProjects(TPProject_id,TPTeam_id) 
             VALUES(?,?)
            ''',[payload['Project_id'],payload['Team_id'] ])
    except sqlite3.IntegrityError as e:
        abort(409, str(e))

    response.status = 201
    return payload



