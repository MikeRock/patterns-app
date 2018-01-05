import React, {Component} from 'react'
/**
 * An adapter HOC that sets the initial state of the component 
 * @param {object} getInitialState Returns a promise with resolves to the state object 
 */
const adapter = (getInitialState) => (Component) => 
class extends Component {
constructor(props) {
super(props)
this.getState = this.getState.bind(this) 
this.state = {}  
}
componentDidMount() {
this.getState()    
}
getState() {
getInitialState()
.then((state) => this.setState(state))
.catch(err => {})
}
render() {
const {...props} = this.props    
return <Component {...props}/>    
}    
}
/**
 * 
 * @param {string} cache The name of the cache 
 * @param {array} names An array of state names 
 */
export const fromLocalCache = (cache, names) => {
let state = {} 
let promises = []   
for (name of names)
promises.push(window.caches.open(cache)
.then(cache => {cache.match(name)})
.then(response => Object.assign(state,{[name]:response}) ))
return Promise.all(promises,arr => arr)
}
/**
 * 
 * @param {string} address The API endpoint  
 */
export const fromAPI = (address) => { 
return new Promise((resolve,reject) => {
let xhr = new XMLHttpRequest()
xhr.open('GET',address)
xhr.onreadystatechange = (e) => {
if(xhr.status == 200 && xhr.readyState == xhr.DONE)
resolve(xhr.responseText)        
}
xhr.onerror = (e) => {
reject(e)
}
xhr.send(null)
})
}