import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.png'
import { Icon } from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { auth } from '../Config/Config'
import { useHistory } from 'react-router-dom'
import { fs } from '../Config/Config'


export const Navbar = ({ user, totalProducts }) => {
    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    fs.collection('users').doc(user.uid).get().then(snapshot => {
                        setUser(snapshot.data().Rol);
                    })
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user;
    }
    const test1 = GetCurrentUser();
    console.log(test1)
    const history = useHistory();

    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push('/login');
        })
    }

    return (
        <div className='navbar'>
            <div className='leftside'>
                <Link to='/'>
                    <img
                        className="logo"
                        src={logo}
                    />
                </Link>
            </div>
            <div className='aquaMarket'>
                AquaMarket
            </div>
            <div className='rightside'>

                {!user && <>
                    <div><Link className='navlink' to="signup">Registrarse</Link></div>
                    <div><Link className='navlink' to="login">Ingresar</Link></div>
                </>}

                {user && test1 == 'User' && <>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    <div><Link className='navlink' to="/add-products">Agregar productos</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="cart">
                            <Icon icon={shoppingCart} size={20} />
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>
                    <div className='btn btn-danger btn-md'
                        onClick={handleLogout}>Desconectarse</div>

                </>}
                {user && test1 == 'Admin' && <>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    <div className='cart-menu-btn'>
                        <div><Link className='navlink' to="users-list">Lista de usuarios</Link></div>
                    </div>
                    <div className='btn btn-danger btn-md'
                        onClick={handleLogout}>Desconectarse</div>


                </>}

            </div>
        </div>

    )
}
