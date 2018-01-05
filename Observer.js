import React, {Component} from 'react'

/**
 * 
 * @param {object} subject  Notifies the observers when new props are recieved 
 */
export const createObservable = (subject) => (Component) => {
return class extends Component {
constructor(props, context) { 
super(props)         
}
componentDidMount() {       
}
componentWillUnmout() {    
}
componentWillRecieveProps(newProps) {
subject.notify(newProps)
}
render() {
let {...props} = this.props
return <Component {...props} />    
}    
}}
/**
 * 
 */
export function Subject() {
let observable = []
function notify(data) {
for (obj of observable)
obj.observer.update(data)        
}    
this.observe = function(observer){
let obj = {observer, id: observable.length}
observable.push(observer)
return unobserve
}
function unobserve (observer) {
observable = observable.filter((item) => item.id != observer.id)
}
}
/**
 * 
 * @param {object} subject Adds the component to the observer list on mount and removes it when on dismounting
 * @param {function} mapNotifyToProps Maps data recieved from observed component to props 
 */
const createObserver = (subject,mapNotifyToProps) => (Component) => {
return class extends Component {
constructor(props, context){
super(props)    
this.update = this.update.bind(this)
this.unobserve
this.state = {update:null}
}
componentDidMount() {
this.unobserve = subject.observe(this)    
}
componentWillUnmount() {
this.unobserve()    
}
update(data) {
this.setState({update:data})
}
render() {
let {update} = this.state    
let {...props} = this.props 
return (<Component {...props} {...mapNotifyToProps(update)} />)    
}}}
