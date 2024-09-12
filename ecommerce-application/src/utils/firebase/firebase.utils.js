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
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
 } from 'firebase/firestore';


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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(docRef, object);
    });


    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

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
    
};

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

export const getCurrentUser = () => {
    // Return a Promise that will resolve with the user's authentication state or reject in case of an error
    return new Promise((resolve, reject) => {
        // Use Firebase's `onAuthStateChanged` to listen for changes in the user's authentication state
        const unsubscribe = onAuthStateChanged(
            auth,  // First argument: The Firebase auth instance we want to monitor
            (userAuth) => {
                // Callback is executed when the auth state changes (user logs in, logs out, or status updates)
                unsubscribe(); // Unsubscribe immediately after getting the current auth state (stop listening for future changes)
                resolve(userAuth); // Resolve the Promise with the `userAuth` object (either the current user or `null` if not logged in)
            },
            reject // If there's an error during this process, reject the Promise and pass the error to the caller
        );
    });
};