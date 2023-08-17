import Navbar from "./components/Navbar"
import CartContainer from "./components/CartContainer"
import { calculateTotals } from './slice/CartSlice'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Modal from "./components/Modal"
const App = () => {
  const { cartItems } = useSelector((store: any) => store.cart)
  const { isOpen } = useSelector((store: any) => store.modal)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(calculateTotals())
    // dispatch(getCartItems())
  }, [cartItems])

  // useEffect(() => {
  //   dispatch(getCartItems())
  // }, [])

  return (
    <div>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </div>
  )
}

export default App