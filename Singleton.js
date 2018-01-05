function Singleton () {
let instance
Singleton = function() {
return instance    
}
instance = this
Singleton.prototype = this
instance.constructor = Singleton
return this
}