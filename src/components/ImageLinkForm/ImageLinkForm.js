import React from 'react';
import './ImageLinkForm.css';

function ImageLinkForm({onInputChange, onPictureSubmit}){
    return(
        <div>
            <p className='pa3'>
                {'This Magic Brain will detect faces in your pictures. Give it a TRY!!!'}
            </p>

            <div className='mycenter center pa4 br3 shadow-5' >
                <input 
                type='tex' 
                className='f4 pa2 w-70 center' 
                onChange={onInputChange} />
                <button 
                className='ma1 w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                onClick={onPictureSubmit}>     Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;