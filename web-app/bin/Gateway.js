"use strict" 
class gateway{
	constructor(domain,port){
		this.domain = domain;
		this.port= port;
	}
	getUrl_access(){
		const gateway_url = "http://" + this.domain + ":" + this.port;
		return  gateway_url;
	}
}
const gateway_config = new gateway('localhost',5500);
const url = gateway_config.getUrl_access();
Object.freeze(url)
module.exports = url;