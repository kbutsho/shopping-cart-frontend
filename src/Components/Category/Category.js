import Axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

const Category = () => {

    // create
    const [createCategory, setCreateCategory] = useState({
        name: '',
        details: '',
        imageURL: '',
        errors: []
    });
    const handelChange = (event) => {
        event.persist();
        setCreateCategory({ ...createCategory, [event.target.name]: event.target.value });
    };
    const Submit = (event) => {
        event.preventDefault();
        const data = {
            name: createCategory.name,
            details: createCategory.details,
            imageURL: createCategory.imageURL,
        };
        Axios.post(`/category`, data)
            .then(res => {
                if (res.data.status === 402) {
                    setCreateCategory({ ...createCategory, errors: res.data.error });
                }
                else{
                    setCreateCategory({
                        name: '',
                        details: '',
                        imageURL: '',
                        errors: []
                    })
                    swal("Done", res.data.message, "success");
                }
            })
    }
    return (
        <div className='container'>
            <form onSubmit={Submit} className='p-3'>
                <input value={createCategory.name} onChange={handelChange} type="text" name="name" placeholder='Name' className={createCategory.errors.name ? "form-control w-25 my-3 is-invalid" : "form-control w-25 my-3 "} />
                <span className="invalid-feedback">{createCategory.errors.name}</span>
                <input value={createCategory.details} onChange={handelChange} type="text" name="details" placeholder='Details' className={createCategory.errors.details ? "form-control w-25 my-3 is-invalid" : "form-control w-25 my-3 "} />
                <span className="invalid-feedback">{createCategory.errors.details}</span>
                <input value={createCategory.imageURL} onChange={handelChange} type="text" name="imageURL" placeholder='imageURL' className={createCategory.errors.imageURL ? "form-control w-25 my-3 is-invalid" : "form-control w-25 my-3 "} />
                <span className="invalid-feedback">{createCategory.errors.imageURL}</span>

                <button type='submit' className='btn btn-info mt-3 btn-sm'>Submit</button>
            </form>

        </div>
    );
};

export default Category;