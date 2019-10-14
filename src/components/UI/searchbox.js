import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
const SearchBox = ({isOpen, onClick, additionalStyles}) => {
    const baseStyles = {
        open: {
            width: 300,
        },
        closed: {
            width: 0,
        },
        smallIcon: {
            width: 30,
            height: 30
        },
        icon: {
            width: 40,
            height: 40,
            padding: 5,
            top: 10
        },
        frame: {
            border: 'solid 1px white',
            borderRadius: 5
        }
    };
    
    let textStyle = isOpen ? baseStyles.open : baseStyles.closed;
    textStyle = Object.assign(textStyle, additionalStyles ? additionalStyles.text : {});
    
    const divStyle = Object.assign({}, textStyle, baseStyles.frame, additionalStyles ? additionalStyles.frame : {});
    divStyle.width += baseStyles.icon.width + 5;
    
    return (
        <div style={divStyle}>
            <IconButton style={baseStyles.icon} onClick={() => onClick()}>
                <SearchIcon style={{color: '#fff'}} />
            </IconButton>
            <TextField name='search' style={textStyle}/>
        </div>
    );
};
export  default SearchBox;