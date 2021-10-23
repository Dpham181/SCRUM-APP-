"use strict" 

let team ={};
	Object.defineProperties(team,
		{
			User_id: {value:null, writable:true, enumerable:true, configurable:true},
			TeamName: {value:null, writable:true, enumerable:true, configurable:true},
			Size:{value:0, writable:true, enumerable:true, configurable:true}
        }	
		);

    Object.seal(team);// no more property can be added or del  



module.exports = team;