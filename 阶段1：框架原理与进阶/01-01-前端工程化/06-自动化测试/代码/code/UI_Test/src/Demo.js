import React from 'react'

export default class Demo extends React.PureComponent {
  static defaultProps = {
  	title: 'This is Demo',
  	value: 0
  };

  constructor(props) {
  	super(props)

  	const { title, value } = props

  	this.state = {
  		title,
  		value
  	}
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({
  		title: nextProps.title
  	})
  }

  add = () => {
  	this.setState({
  		value: this.state.value + 1
  	})
  };

  change = event => {
  	this.setState({
  		value: event.target.value
  	})
  };

  render() {
  	return (
  		<div className="container">
  			<h1>{this.state.title}</h1>
  			<div className="counter">{this.state.value}</div>
  			<input value={this.state.value} type="text" onChange={this.change} />
  			<button onClick={this.add}>Value++</button>
  		</div>
  	)
  }
}
