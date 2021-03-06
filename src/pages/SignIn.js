import React from 'react'
import firebase from 'firebase/app'
import { Container, Grid ,Panel,Row,Col, Button, Icon, Alert } from 'rsuite';
import '../styles/utility.scss'
import { auth, database } from '../misc/firebase';

const SignIn = () => {

    const signInWithProvider = async (provider) => {
        try {
            const {additionalUserInfo,user}= await auth.signInWithPopup(provider);
        
            if(additionalUserInfo.isNewUser){
                database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt : firebase.database.ServerValue.TIMESTAMP
                })
            }
            Alert.success("Signed In",4000);
        } catch(err) {
            Alert.error(err.message,4000);
        }
       
    }

    const onFacebookSignIn = () => {
        signInWithProvider(new firebase.auth.FacebookAuthProvider());
    }

    const onGoogleSignIn = () => {
        signInWithProvider(new firebase.auth.GoogleAuthProvider());
    }


    return (
        <Container>
            <Grid className="mt-page">
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className="text-center">
                                <h2>Chat Application</h2>
                                <p>Progressive chat app</p>
                            </div>
                            <div className="mt-3">
                                <Button block color="cyan" onClick = {onFacebookSignIn}>
                                    <Icon icon="facebook"> Continue with facebook</Icon>
                                </Button>
                                <Button block color="violet" onClick = {onGoogleSignIn}>
                                    <Icon icon="google"> Continue with google</Icon>
                                </Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    );
}

export default SignIn;
