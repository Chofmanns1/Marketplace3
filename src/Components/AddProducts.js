import React, { useState } from 'react'
import { storage, fs } from '../Config/Config'
import { Link } from 'react-router-dom'

export const AddProducts = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const [imageError, setImageError] = useState('');

    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImage(selectedFile);
                setImageError('');
            }
            else {
                setImage(null);
                setImageError('please select a valid image file type (png or jpg)')
            }
        }
        else {
            console.log('please select your file');
        }
    }

    const handleAddProducts = (e) => {
        e.preventDefault();
        // console.log(title, description, price);
        // console.log(image);
        const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress);
        }, error => setUploadError(error.message), () => {
            storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                fs.collection('Products').add({
                    title,
                    description,
                    price: Number(price),
                    url
                }).then(() => {
                    setSuccessMsg('Product added successfully');
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    document.getElementById('file').value = '';
                    setImageError('');
                    setUploadError('');
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 3000)
                }).catch(error => setUploadError(error.message));
            })
        })
    }

    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Agregar productos</h1>
            <hr></hr>
            {successMsg && <>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Nombre del producto</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setTitle(e.target.value)} value={title}></input>
                <br></br>
                <label>Descripción del producto</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setDescription(e.target.value)} value={description}></input>
                <br></br>
                <label>Valor del producto</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setPrice(e.target.value)} value={price}></input>
                <br></br>
                <label>Seleccione la imagen del producto</label>
                <input type="file" id="file" className='form-control' required
                    onChange={handleProductImg}></input>

                {imageError && <>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>

                </>}
                <span>Volver a la pagina principal presionie
                    <Link to="/" className='link'> aqui</Link></span>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className='btn btn-success btn-md'>
                        Enviar
                    </button>
                </div>
            </form>
            {uploadError && <>
                <br></br>
                <div className='error-msg'>{uploadError}</div>

            </>}

        </div>
    )
}
