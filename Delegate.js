import React, {Component} from 'react'
/**
 * A delegate HOC which separates the execution of actions and the component implementation
 * @param {array} delegates A array with implemented delegate objects
 */
export const addDelegate = (...delegates) => (Component) =>
class extends Component {
constructor(props,context) {
super(props)
this.delegateTo = this.delegateTo.bind(this)
this.use = this.use.bind(this)
this.state = {delegates:[...delegates],use:null}    
}
delegateTo(delegate){
this.setState({use:delegate})
}
use() {
let {use:action} = this.state    
if(action != null)    
use()
} 
render() {
let {...props} = this.props
return <Component {...props}/>    
}   
} 
