import React from 'react';

const Error = () => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '85vh' }}>
            <div>
                <h1 className='text-center text-danger fw-bold'>404</h1>
                <h4 className='text-danger'>Page not found!</h4>
            </div>
        </div>
    );
};

export default Error;