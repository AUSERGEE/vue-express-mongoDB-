const noname='noname'

export default{
	getStore (key=noname){
		console.log('util.js: get local operation')
		return JSON.parse(window.localStorage.getItem(key))
	},
	setStore(key,res,concat=false){
		console.log('util.js: set local operation')
		if(concat){
			let oldData=this.getLocal(key)
			return window.localStorage.setItem(key,JSON.stringify(oldData.concat(res)))
		}
		return window.localStorage.setItem(key,JSON.stringify(res))
	},
	removeStore(key){
		if(!key) return
	    console.log('util.js: del local operation')
		window.localStorage.removeItem(key)
	}

}