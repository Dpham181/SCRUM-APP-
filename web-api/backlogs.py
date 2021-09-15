from bottle import get, post, error, abort, request, response, HTTPResponse, route , run
import root
import sqlite3


#creat product backlog item for specific project
#http --verbose POST localhost:5400/Backlogs/Product/ Product_id="4" description="testing product item" 
@route('/Backlogs/Product/', method='POST')
def CreateProductBL(BacklogsDB):
    payload = request.json

    if not payload:
        abort(400)

    posted_fields = payload.keys()
    required_fields = {'Product_id', 'description'}

    if not required_fields <= posted_fields:
        abort(400, f'Missing fields: {required_fields - posted_fields}')

    try:
        payload['Item_id'] = root.execute(BacklogsDB, '''
           INSERT INTO productbacklog(Product_id,description)
            VALUES(:Product_id, :description)
            ''', payload)
    except sqlite3.IntegrityError as e:
        abort(409, str(e))

    response.status = 201
    return payload
# get product backlog items for specific project
#http --verbose GET localhost:5400/Backlogs/Product/1
@route('/Backlogs/Product/<Product_id>', method='GET')
def GetProductBL(Product_id,BacklogsDB):
    Produc_items = root.query(BacklogsDB, 'select Item_id, description from productbacklog where Product_id =?',[Product_id]);
    if not Produc_items:
        abort(400)
    rep = {'Produc_items': Produc_items}    
    return HTTPResponse(rep,200)


