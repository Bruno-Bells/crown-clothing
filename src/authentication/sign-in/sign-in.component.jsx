// import { useEffect } from 'react';
// import { getRedirectResult } from "firebase/auth";
// import {signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'
import { useState } from "react";
import {auth, signInWithGooglePopup, createUserDocument, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from "../../components/button/button.component";
import './sign-in-form.styles.scss'


const defaultFormFields = {
    email: '',
    password: '',
}

const SignIn = () => {
    // This useEffect is to login with Google Redirect
//     useEffect(() => {
//         const redirectSignin = async () => {
//             const response = await getRedirectResult(auth);
//             console.log(response);
//             if(response){
//                 const userDocRef = await createUserDocument(response.user)
//             }
//         }
//         redirectSignin();
// }, []);

    

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password } = formFields;

    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields()
        } catch (error) {
            
            if (error.code === 'auth/wrong-password') {
                alert('Wrong Password, but email is correct, try sign in with Google')
            } else if(error.code === 'auth/user-not-found'){
                alert("Account does not exist")
            }
            else {
                console.log(error)
            }
        }
      
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value})
    }

    const signInWithGoogle = async() => {
        const {user} = await signInWithGooglePopup();
        // console.log(user);
        const userDocRef = await createUserDocument(user);

    }

    return (
        <div>
            <div className='sign-in-container'>
                <h2>Already have an account?</h2>
                <span>Sign In with your email and password</span>
                
                <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                </form>
                {/* <button onClick={signInWithGoogleRedirect}>Sign in with google Redirect</button> */}
            </div>
        </div>
    )
}

export default SignIn;