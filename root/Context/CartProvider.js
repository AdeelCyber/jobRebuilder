import React, { useContext, createContext, useState } from 'react'
const CartContext = createContext()

export function CartProvider({ children }) {
<<<<<<< HEAD
  const [accessToken, setaccessToken] = useState("");
  const [refreshToken, setrefreshToken] = useState("");
  const [userdetails, setuserdetails] = useState([]);
  const [socket, setsocket] = useState();
=======
  const [accessToken, setaccessToken] = useState('')
  const [refreshToken, setrefreshToken] = useState('')
  const [userdetails, setuserdetails] = useState([])
>>>>>>> 0f0647cf93d9bef5a40493dda80d908d63690a6e

  return (
    <CartContext.Provider
      value={{
        accessToken,
        setaccessToken,
        refreshToken,
        setrefreshToken,
        userdetails,
        setuserdetails,
        socket,
        setsocket,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
