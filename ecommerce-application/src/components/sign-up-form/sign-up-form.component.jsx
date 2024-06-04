import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        if(password!=confirmPassword){
            alert("passwords do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch(err) {
            if(err.code == 'auth/email-already-in-use') {
                alert('Email already in use');
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    }
    
    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" required name="displayName" value={displayName} onChange={handleChange}></input>
                <label>Email</label>
                <input type="email" required name="email" value={email} onChange={handleChange}></input>
                <label>Password</label> 
                <input type="password" required name="password" value={password} onChange={handleChange}></input>
                <label>Confirm Password</label>
                <input type="password" required name="confirmPassword" value={confirmPassword} onChange={handleChange}></input>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;