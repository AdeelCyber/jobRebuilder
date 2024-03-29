import React, { useContext, createContext, useState } from "react";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [accessToken, setaccessToken] = useState("");
  const [refreshToken, setrefreshToken] = useState("");
  const [userdetails, setuserdetails] = useState([]);
  const [milestone, setmilestone] = useState([]);
  const [socket, setsocket] = useState();
  const [userTab, setUserTab] = useState(false);
  const [isComplete, setComplete] = useState("true");
  const [islogin, setislogin] = React.useState(false);
  const [firstlogin, setfirstlogin] = React.useState(false);

  return (
    <CartContext.Provider
      value={{
        isComplete,
        setComplete,
        accessToken,
        setaccessToken,
        setuserdetails,
        setrefreshToken,
        setislogin,
        refreshToken,
        userdetails,
        milestone,
        setmilestone,
        socket,
        setsocket,
        islogin,
        userTab,
        setUserTab,
        firstlogin,
        setfirstlogin,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
