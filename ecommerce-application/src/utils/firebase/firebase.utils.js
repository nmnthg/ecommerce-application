import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBDvsez_73FViXJvxKAfZd4rlq1UOh8R5c",
    authDomain: "crwn-clothing-db-ab7b0.firebaseapp.com",
    projectId: "crwn-clothing-db-ab7b0",
    storageBucket: "crwn-clothing-db-ab7b0.appspot.com",
    messagingSenderId: "328952606766",
    appId: "1:328952606766:web:cc0578966218ed36232fbf"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);


//Authentication
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = async() => {
    try {
        await signInWithPopup(auth, provider);
    } catch (err) {
        if (err.code === 'auth/popup-closed-by-user') {
            throw new Error('The authentication popup was closed before completing the sign-in process.');
        } else {
            throw err; // Re-throw other errors for further handling
        }
    }
};

//Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'user', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation})
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }
    
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)