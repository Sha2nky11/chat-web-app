
import { useCallback, useState,useEffect } from "react";

export function useModalState(defaultValue = false){
    const [isOpen,setIsOpen] = useState(defaultValue);

    const open = useCallback(() => {return setIsOpen(true)},[]);
    const close = useCallback(() => {return setIsOpen(false)},[]);
    
    return {isOpen,open,close};

}

export const useMediaQuery = query => {
    const [matches, setMatches] = useState(
      () => {return window.matchMedia(query).matches}
    );
  
    useEffect(() => {
      const queryList = window.matchMedia(query);
      setMatches(queryList.matches);
  
      const listener = evt => {return setMatches(evt.matches)};
  
      queryList.addListener(listener);
      return () => {return queryList.removeListener(listener)};
    }, [query]);
  
    return matches;
  };

