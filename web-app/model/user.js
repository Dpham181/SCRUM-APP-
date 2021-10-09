"use strict" 

let user ={};
	Object.defineProperties(user,
		{
			UserName: {value:null, writable:true, enumerable:true, configurable:true},
			PassWord: {value:null, writable:true, enumerable:true, configurable:true},
			PUSER_ID:{value:0, writable:true, enumerable:true, configurable:true},
			FIRST_NAME: {value:null, writable:true, enumerable:true, configurable:true},
			LAST_NAME: {value:null, writable:true, enumerable:true, configurable:true},
			COUNTRY: {value:null, writable:true, enumerable:true, configurable:true},
			ZIPCODE: {value:0, writable:true, enumerable:true, configurable:true},
			CITY: {value:null, writable:true, enumerable:true, configurable:true},
			STREET: {value:null, writable:true, enumerable:true, configurable:true},
			STATE: {value:null, writable:true, enumerable:true, configurable:true},
		} 
		);

    Object.seal(user);// no more property can be added or del  



module.exports = user;