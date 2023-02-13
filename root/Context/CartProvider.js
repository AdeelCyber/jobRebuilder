import React, { useContext, createContext, useState } from "react";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [accessToken, setaccessToken] = useState("");
  const [refreshToken, setrefreshToken] = useState("");
  const [userdetails, setuserdetails] = useState([]);
  const [milestone, setmilestone] = useState([]);
  const [socket, setsocket] = useState();
  const [islogin, setislogin] = React.useState(false);

  return (
    <CartContext.Provider
      value={{
        accessToken,
        setaccessToken,
        refreshToken,
        setrefreshToken,
        userdetails,
        setuserdetails,
        milestone,
        setmilestone,
        socket,
        setsocket,
        islogin,
        setislogin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
