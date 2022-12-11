import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const File = () => {
    const [image, setImage] = useState([])
    useEffect(() => {
        axios.get(`/product/file`)
            .then(res => setImage(res.data.data))
    }, [])
    console.log(image)
    return (
        <div className='container'>
            {
                image ? (
                    <>
                        <table className="table-bordered table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Picture No</th>
                                    <th>Images</th>
                                </tr>
                            </thead>
                            {
                                image.map(item =>
                                    <tbody key={item._id} >
                                        <tr>
                                            <td>{item._id}</td>
                                            <td>{item.image.length}</td>
                                            <td>
                                                {
                                                    item.image ? (
                                                        <>
                                                            {
                                                                item.image.map((img, index) => {
                                                                    return (
                                                                        <div className='d-flex' style={{ minHeight: "100px" }} key={index + 1}>
                                                                            <img style={{ height: "80px", width: "80px" }} src={`http://localhost:8000/${img}`} alt="img" />
                                                                        </div>)


                                                                }

                                                                )
                                                            }
                                                        </>
                                                    ) : null
                                                }
                                            </td>
                                        </tr>

                                    </tbody>
                                )
                            }
                        </table>
                    </>

                ) : (<>loading</>)
            }
        </div>
    );
};

export default File;