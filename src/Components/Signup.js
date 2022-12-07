import React, { useState } from 'react'
import { auth, fs } from '../Config/Config'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export const Signup = () => {

    const history = useHistory();

    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [direction, setDirection] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password,
                Rol: document.getElementById("rol").value,
                Telefono: phone,
                Direccion: direction,
                Ciudad: city,
                Region: region,
                Especialidad: document.getElementById("speciality").value
            }).then(() => {
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setFullname('');
                setEmail('');
                setPassword('');
                setPhone('');
                setDirection('');
                setCity('');
                setRegion('');
                setErrorMsg('');
                setTimeout(() => {
                    setSuccessMsg('');
                    history.push('/login');
                }, 3000)
            }).catch(error => setErrorMsg(error.message));
        }).catch((error) => {
            setErrorMsg(error.message)
        })
    }

    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Registrarse</h1>
            <hr></hr>
            {successMsg && <>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                <label>Nombre completo</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setFullname(e.target.value)} value={fullName}></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Contraseña</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <br></br>
                <br></br>
                <label>Telefono</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setPhone(e.target.value)} value={phone}></input>
                <br></br>
                <br></br>
                <label>Direccion</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setDirection(e.target.value)} value={direction}></input>
                <br></br>
                <br></br>
                <label>Ciudad</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setCity(e.target.value)} value={city}></input>
                <br></br>
                <br></br>
                <label>Region</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setRegion(e.target.value)} value={region}></input>
                <br></br>
                <label>
                    Rol:
                    <select id="rol">
                        <option value="Admin">Administrador</option>
                        <option value="User">Usuario</option>
                    </select>
                </label>
                <label>
                    Rol:
                    <select id="speciality">
                        <option value="T1">Trabajador 1</option>
                        <option value="T2">Trabajador 2</option>
                    </select>
                </label>
                <div className='btn-box'>
                    <span>Ya tengo una cuenta, ingresar
                        <Link to="login" className='link'> aqui</Link></span>
                    <button type="submit" className='btn btn-success btn-md'>Registrarse</button>
                </div>

                <div>
                    <span>
                        <Link to="/" className='return'> Volver </Link></span>
                </div>
            </form>
            {errorMsg && <>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>
            </>}
        </div>
    )
}
