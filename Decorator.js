import Reaact, {Component} from 'react'

/**
 * 
 * @param {function} setInitialState Sets initial state of component 
 * @param {function} mapStateToProps Maps injected state to statless component props
 */
export const  decorator = (setInitialState,mapStateToProps) => (StatelessComponent) =>
class extends Component {
constructor(props) {
super(props)
this.state = setInitialState()    
}
render() {
let {...props} = this.props    
return <StatelessComponent {...props} {...mapStateToProps(this.state)}/>    
}
}}