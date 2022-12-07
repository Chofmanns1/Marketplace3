import React, { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
import { auth, fs } from '../Config/Config'

export const ListUsers = (props) => {

    // getting current user uid
    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }

    const uid = GetUserUid();

    // getting current user function
    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    fs.collection('users').doc(user.uid).get().then(snapshot => {
                        setUser(snapshot.data().FullName);
                    })
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user;
    }

    const user = GetCurrentUser();
    // console.log(user);

    // state of products
    const [products, setProducts] = useState([]);

    // getting products function
    const getProducts = async () => {
        const products = await fs.collection('users').get();
        const productsArray = [];
        for (var snap of products.docs) {
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if (productsArray.length === products.docs.length) {
                setProducts(productsArray);
            }
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div>
            <Navbar user={user} uid={uid} />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">Users List</h1>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th>Dirección</th>
                                    <th>Ciudad</th>
                                    <th>Region</th>
                                    <th>Especialidad</th>
                                    <th>Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product) => {
                                        return (
                                            <tr key={product.ID}>
                                                <td>{product.FullName}</td>
                                                <td>{product.Email}</td>
                                                <td>{product.Telefono}</td>
                                                <td>{product.Direccion}</td>
                                                <td>{product.Ciudad}</td>
                                                <td>{product.Region}</td>
                                                <td>{product.Especialidad}</td>
                                                <td>{product.Rol}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}