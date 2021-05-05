
import { useCallback, useState } from "react";

export function useModalState(defaultValue = false){
    const [isOpen,setIsOpen] = useState(defaultValue);

    const open = useCallback(() => {return setIsOpen(true)},[]);
    const close = useCallback(() => {return setIsOpen(false)},[]);
    
    return {isOpen,open,close};
}