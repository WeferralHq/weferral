import React from 'react';

let Price = function(data){
    if(data === null){
        return(
            <span>${(data * 100).toFixed(2)}</span>
        );
        
    }else{
        let price = parseInt(data);
        return(
            <span>${(price).toFixed(2)}</span>
        );
    }
    
};

export default Price;