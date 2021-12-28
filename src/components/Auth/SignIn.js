import React from "react";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import Login from "./Login";

class SignIn extends React.Component {
  state = {
    user: ""
  };

  // componentDidMount() {
  //
  // }

  authHandler = async(authData) => {
    console.log( authData );
    const { email } = authData.user;
    this.setState( { user: email } );
  };

  authenticate = () => {
    const authProvider = new GithubAuthProvider();
    const auth = getAuth();
    signInWithPopup( auth, authProvider )
      .then( (result) => {
        const credential = GithubAuthProvider.credentialFromResult( result );
        // const token = credential.accessToken;
        console.log( result.user.email );
        // const user = result.user;
        this.setState( { user: result.user.email } );
        console.log( this.state.user );
      } ).catch( (error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log( errorCode, errorMessage );
      // The email of the user's account used.
      const email = error.email;
      console.log( email );
      // The AuthCredential type that was used.
      // const credential = GithubAuthProvider.credentialFromError( error );
      // ...
    } );
  };

  render() {
    if( !this.state.user ) {
      return <Login authenticate={ this.authenticate }/>;
    }
    return this.props.children;
  }
}

export default SignIn;