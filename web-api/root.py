
import sys
import sqlite3
import bottle
from bottle.ext import sqlite
from bottle import HTTPResponse,request, abort




# Set up app, plugins
app = bottle.default_app()
scrumAppConfig = app.config.load_config('./etc/ScrumAPP.ini')
Users_DB = sqlite.Plugin(scrumAppConfig['sqlite.usersdb'], keyword ='UsersDB')
Projects_DB = sqlite.Plugin(scrumAppConfig['sqlite.projectsdb'], keyword ='PojectsDB')
Teams_DB = sqlite.Plugin(scrumAppConfig['sqlite.teamsdb'], keyword ='TeamsDB')
Backlogs_DB = sqlite.Plugin(scrumAppConfig['sqlite.backlogsdb'], keyword ='BacklogsDB')
app.install(Users_DB)
app.install(Projects_DB)
app.install(Teams_DB)
app.install(Backlogs_DB)



# Disable warnings produced by Bottle 0.12.19.
#
#  1. Deprecation warnings for bottle_sqlite
#  2. Resource warnings when reloader=True
#
# See
#  <https://docs.python.org/3/library/warnings.html#overriding-the-default-filter>
#
if not sys.warnoptions:
    import warnings
    for warning in [DeprecationWarning, ResourceWarning]:
        warnings.simplefilter('ignore', warning)


# Simplify DB access
#
# Adapted from
# <https://flask.palletsprojects.com/en/1.1.x/patterns/sqlite3/#easy-querying>
#
def query(db, sql, args=(), one=False):
    cur = db.execute(sql, args)
    rv = [dict((cur.description[idx][0], value)
          for idx, value in enumerate(row))
          for row in cur.fetchall()]
    cur.close()

    return (rv[0] if rv else None) if one else rv


def execute(db, sql, args=()):
    cur = db.execute(sql, args)
    id = cur.lastrowid
    cur.close()

    return id


def PostMethod(DB,QUERY,KEYS):
    payload = request.json

    if not payload:
        abort(400)

    posted_fields = payload.keys()
    required_fields = KEYS

    if not required_fields <= posted_fields:
        abort(400, f'Missing fields: {required_fields - posted_fields}')

    try:
        payload['id'] = execute(DB, QUERY, payload)
    except sqlite3.IntegrityError as e:
        abort(409, str(e))

    return HTTPResponse(payload,201)