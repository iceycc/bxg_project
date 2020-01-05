import { connect } from 'react-redux'
import Products from '../components/Products'
import { getAllProducts, addToCart } from '../actions/'

function mapStateToProps(state) {
  return {
    products: state.products.all
  }
}

const mapDispatchToProps = {
  getAllProducts,
  addToCart
}

const ProductsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)

export default ProductsContainer
