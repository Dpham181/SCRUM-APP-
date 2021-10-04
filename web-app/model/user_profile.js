"use strict" 

let profile ={};
	Object.defineProperties(profile,
		{
			Name: {value:null, writable:true, enumerable:true, configurable:true},
			Address: {value:null, writable:true, enumerable:true, configurable:true},
			
		} 
		);

    Object.seal(profile);// no more property can be added or del  



module.exports = profile;