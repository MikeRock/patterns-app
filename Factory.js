import React, {Component, PropTypes} from 'react'

/**
 * Creates an abstract factory class which serves 
 * as a default interface for creating components
 * All components define props so it is a shared action
 * among components
 * Component types can be easily extended
 */
function ComponentFactory () {
this.component    
}

ComponentFactory.prototype.create = () => {}
ComponentFactory.prototype.addProps = () => {
this.component.propTypes = this.propTypes
this.component.defaultProps = this.defaultProps
}
ComponentFactory.prototype.renderComponent = () => {}   
/**
 * 
 * @param {object} subclass Subclass to be extended 
 * @param {object} superclass Abstract class which extends the subclass
 */
function extend(subclass,superclass) {
subclass.prototype = superclass.prototype
subclass.prototype.constructor = subclass    
}

extend(ListItemFactory,ComponentFactory)

ListItemFactory.prototype.create = (type) => {
if(typeof ListItemFactory[type] == 'function'){
    const factory = new ListItemFactory[type]
    factory.renderComponent()
    factory.addProps()
    return this.component
}
else throw new Error('Component not supported!')    
}
/**
 * Basic list item
 */
ListItemFactory.simpleListItem = function() {
this.propTypes = {name: PropTypes.string.isRequired}
this.defaultProps = {name:'Item'}
this.renderComponent = () => {
this.component = class extends Component {
constructor(props) {
super(props)    
}
render() {
    return (<li>{this.props.name}</li>)    
    }
} 
}}
/**
 * List item with remove button
 */
ListItemFactory.superListItem = function(handler) {
this.propTypes = {name: PropTypes.string.isRequired,
removeHandler: PropTypes.func.isRequired}
this.defaultProps = {name:'Item',removeHandler: handler}
this.renderComponent = () => {
this.component = class extends Component {
constructor(props) {
super(props)    
}
render() {
    return (<li>{this.props.name}<button onClick={removeHandler}></button></li>)    
    }
} 
}}

export default ComponentFactory