import React from 'react';

const Iframe = ({ source, title }) => {

    if (!source) {
        return <div>Please choose to view the Frame.</div>;
    }

    const src = source;     
    return (
        // basic bootstrap classes. you can change with yours.
        <div className="col-lg-12">
            <div className="emdeb-responsive" >
                <iframe src={src} style={{width:"100%", height:"600px"}} title = {title}></iframe>
            </div>
        </div>
    );
};

export default Iframe;