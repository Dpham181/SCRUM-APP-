from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3

# Product backlog
#creat product backlog item for specific project
#http --verbose POST localhost:5400/Backlogs/Product/ Product_id="4" description="testing product item" 
@route('/Backlogs/Product/', method='POST')
def CreateProductBL(BacklogsDB):
    required_fields = {'Product_id', 'description'}
    statement = '''INSERT INTO productbacklog(Product_id,description)
            VALUES(:Product_id, :description)
            '''
    productBL = root.PostMethod(BacklogsDB,statement,required_fields)
    
    return productBL
# get product backlog items for specific project
#http --verbose GET localhost:5400/Backlogs/Product/1
@route('/Backlogs/Product/<Product_id>', method='GET')
def GetProductBL(Product_id,BacklogsDB):
    Produc_items = root.query(BacklogsDB, 'select Item_id, description from productbacklog where Product_id =?',[Product_id]);
    if not Produc_items:
        abort(400)
    rep = {'Produc_items': Produc_items}    
    return HTTPResponse(rep,200)

# Sprint backlog

#creat sprint backlog item for specific project
#http --verbose POST localhost:5400/Backlogs/Sprint/ PItem_id="3" Iteration_Number="1" Use_Stories="sprint req from project 2" 
@route('/Backlogs/Sprint/', method='POST')
def CreateSprintBL(BacklogsDB):
    required_fields = {'PItem_id', 'Iteration_Number','Use_Stories'}

    statement = ''' INSERT INTO sprintbacklog(PItem_id,Iteration_Number,Use_Stories)
            VALUES(:PItem_id, :Iteration_Number,:Use_Stories) '''
    SprintBL = root.PostMethod(BacklogsDB,statement, required_fields)
    return  SprintBL
# get product backlog items for specific product backlog
#http --verbose GET localhost:5400/Backlogs/Sprint/1
@route('/Backlogs/Sprint/<Product_id>', method='GET')
def GetSprintBL(Product_id,BacklogsDB):
    Spint_items = root.query(BacklogsDB, 'select Sprint_id, Iteration_Number,Use_Stories, Status from sprintbacklog where PItem_id IN (select Item_id from productbacklog where Product_id = ? )',[Product_id]);
    if not Spint_items:
        abort(400)
    rep = {'Spint_items': Spint_items}    
    return HTTPResponse(rep,200)