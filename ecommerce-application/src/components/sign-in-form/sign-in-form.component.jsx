import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { ButtonContainer, SignInContainer} from './sign-in-form.styles.jsx';
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action.js";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
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
        dispatch(googleSignInStart());
    }
    
    return (
        <SignInContainer>
            <h2>Already have and account?</h2>
            <span>Sign in</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required name="email" value={email} onChange={handleChange}/>
                <FormInput label="Password" type="password" required name="password" value={password} onChange={handleChange}/>
                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} type='button'>Google Sign In</Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;