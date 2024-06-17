import { useSelector } from "react-redux";
import CartItemList from "./Components/CartItemList/CartItemList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import Password from "../src/Components/ForgotPassword/Password"
function App() {
  const showcart = useSelector((state) => state.ui.cartIsVisible);
  return (
    <div>
        <BrowserRouter>
        <Nav />
        <Routes>
          {/* <Route element={<Private/>}> */}
          <Route path="/" element={<Home />} />
          {/* </Route> */}
          <Route path="/signin" element={<Signup />}></Route>
          <Route path="/forgot" element={<Password />}></Route>
        </Routes>
      </BrowserRouter>
      {showcart && <CartItemList />}
    </div>
  );
}

export default App;
