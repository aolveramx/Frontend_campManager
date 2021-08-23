import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {  getMe } from '../../api/auth';
import placeholder from '../../assets/images/placeholder.png'  
import profile from './profile.css';


const EditPhoto = ({photoEdit, ...props}) => {

    const [newPhoto, setNewPhoto] = React.useState({});
    const [oldData, setOldData] = React.useState({});

    React.useEffect(() => {
        handleOldData();
    }, []);

    const handleOldData = async () => {
      const myOldData = await getMe();
      setOldData(myOldData.data)
    };

    console.log(oldData)

   const handleChangeFile = event => {
        const file = event.target.files[0].name;
        const newPic = {
            file: file,
        }
        setNewPhoto(newPic)  
    };
    console.log(newPhoto)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const photoData = newPhoto;
        photoEdit(photoData);
    }

    return (
        <div className='edit-photo'>
            <Form onSubmit={ handleSubmit }>
                <Form.Label className='title-photo'>Profile picture</Form.Label>
                    <img className='prueba' src={oldData.photo === '' || null ? placeholder : oldData.photo}></img>
                    <Form.Control
                        className='registerForm-photo'
                        type="file"
                        name="photo"     
                        value={null}
                        onChange={handleChangeFile}
                    />
                <Button
                    variant="outline-dark"
                    type="submit"
                    className="edit-photo-button"
                >
                Edit photo 
                </Button>
            </Form>
        </div>
    )
}

export default EditPhoto;