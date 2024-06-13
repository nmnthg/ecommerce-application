import { useState, useContext } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';
import { UserContext } from "../../contexts/user.context";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        } catch (err) {
            switch(err.code) {
                case 'auth/wrong-password':
                    alert('Incorrect credentials');
                    break
                case 'auth/user-not-found':
                    alert('Incorrect credentials');
                    break
                default:
                    alert('Error signing in');
                    console.log(err.message);
            }
        };
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    }

    const signInWithGoogle = async () => {
        try {
            const {user} = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);
        } catch (err) {
            console.log(err.message);
        };
    }
    
    return (
        <div className="sign-up-container">
            <h2>Already have and account?</h2>
            <span>Sign in</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange}/>
                <FormInput label="Password" type="password" required name="password" value={password} onChange={handleChange}/>
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' onClick={signInWithGoogle} type='button'>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;