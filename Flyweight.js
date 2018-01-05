import React, {Component} from 'react'

export const createFlyweight = (factory) => (Component) =>
class extends Component {
constructor(props){
super(props)    
}
componentDidMount() {    
}
render() {
    let {children: chld, ...props} = this.props
    let children = React.Children.toArray(chld)
return <Component {...props} />    
}    
}

export const componentFactory = () => {
repo = []    
this.createFlyweight = (...intrinsicProps) => {
if(Object.keys(repo).some((item) => item === JSON.stringify(intrinsicProps)))    
return repo[JSON.stringify(intrinsicProps)]
else repo[JSON.stringify(intrinsicProps)] = React.cloneElement('li',{...intrinsicProps})
} 
}