import React, { createContext ,useState,useContext,useEffect} from 'react';
import firebase from 'firebase/app'
import { auth, database } from '../misc/firebase';


export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const  isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {

    const [profile,setProfile] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
   
    useEffect(() => {

        let userRef ;
        let userStatusRef;
       const authUnSub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
                
                userRef = database.ref(`/profiles/${authObj.uid}`);
                userStatusRef = database.ref(`/status/${authObj.uid}`);
                userRef.on('value',(snap) => {
                const {name,createdAt,avatar} = snap.val();
                const data = {
                    name,
                    createdAt,
                    avatar,
                    uid : authObj.uid,
                    email : authObj.email
                }
                setProfile(data);
                setIsLoading(false);
             });

             
             
             database.ref('.info/connected').on('value', (snapshot) => {
                // If we're not currently connected, don't do anything.
                if (!!snapshot.val() === false) {
                    return;
                };
            
                // If we are currently connected, then use the 'onDisconnect()' 
                // method to add a set which will only trigger once this 
                // client has disconnected by closing the app, 
                // losing internet, or any other means.
                userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                    // The promise returned from .onDisconnect().set() will
                    // resolve as soon as the server acknowledges the onDisconnect() 
                    // request, NOT once we've actually disconnected:
                    // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect
            
                    // We can now safely set ourselves as 'online' knowing that the
                    // server will mark us as offline once we lose connection.
                    userStatusRef.set(isOnlineForDatabase);
                });
            });

           }
            else {

                database.ref('.info/connected').off();

                if(userRef){
                    userRef.off();
                }
                if(userStatusRef){
                    userStatusRef.off();
                }
                setProfile(null);
                setIsLoading(false);
            }
        });
        return () => {
            authUnSub();
            database.ref('.info/connected').off();
            if(userRef){
                userRef.off();
            }
            if(userStatusRef){
                userStatusRef.off();
            }
        };
    },[])

    return(
        <ProfileContext.Provider value = {{isLoading,profile}}> { children} </ProfileContext.Provider>
    ); 
}

export const useProfile = () => {return useContext(ProfileContext)};