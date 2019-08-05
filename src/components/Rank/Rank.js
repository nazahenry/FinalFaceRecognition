import React from 'react';


function Rank({name, entries}){
    return(
        <div>
            <div className='white f3'>
                <em>{name}</em>{', your current entry count is....'}
            </div>
            <div className='white f1'>
              <strong>{entries}</strong>  
            </div>
        </div>
    );
}

export default Rank;