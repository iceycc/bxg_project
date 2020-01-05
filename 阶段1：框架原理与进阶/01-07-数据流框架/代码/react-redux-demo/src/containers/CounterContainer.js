import { connect } from 'react-redux'
import Counter from '../components/Counter'

const mapStateToProps = state => {
  return {
    foo: 'bar',
    value: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick () {
      window.alert('hello')
    },
    handleIncrement () {
      dispatch({
        type: 'INCREMENT'
      })
    },
    handleDecrement () {
      dispatch({
        type: 'DECREMENT'
      })
    }
  }
}

const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default CounterContainer
