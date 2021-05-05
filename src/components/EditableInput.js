import React, { useCallback, useState } from 'react'
import { Input, InputGroup,Icon, Alert } from 'rsuite'


const EditAbleInput = ({initialValue,onSave,label,placeholder ='Write your value',emptyMsg='Input is empty', ...inputProps}) => {
    
    const [input,setInput] = useState(initialValue);
    const [isEditable,setEditable] = useState(false);

    const onInputChange = useCallback((value) => {
        setInput(value);
    },[]) ;

    const onEditClick = useCallback(() =>{
        setEditable(p => {return !p});
        setInput(initialValue);
    },[initialValue])

    const onSaveClick = async () => {
        const trimmed = input.trim();
        if(trimmed === ''){
            Alert.info(emptyMsg,5000);
        }

        if(trimmed !== initialValue){
            await onSave(trimmed);
        }

        setEditable(false);
    }
    
    return (
        <div>
          {label}
          <InputGroup>
          <Input 
                disabled={!isEditable}
                {...inputProps} 
                value={input}
                placeholder={placeholder} 
                onChange={onInputChange}/>
            <InputGroup.Button onClick={onEditClick}>
                <Icon icon ={isEditable?'close':'edit2'}/>
            </InputGroup.Button>
            {isEditable &&
            <InputGroup.Button onClick={onSaveClick}>
                 <Icon icon ="check"/>
             </InputGroup.Button>
            }
            </InputGroup>
        </div>
    )
}

export default EditAbleInput;
