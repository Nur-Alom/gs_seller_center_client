import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import nanUser from '../Images/user.png';
import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";

// 
initializeAuthentication();



const useFirebase = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState('');


    // All Toast Messages.
    const toastRegister = () => toast.success("New User Register Successfully!");
    const toastLogin = () => toast.success("User Login Successfully!");
    const toastError = (error) => {
        if (error === "Firebase: Error (auth/email-already-in-use).") {
            toast.error("Email Address Already In-Use!!");
        }
        else if (error === "Firebase: Error (auth/wrong-password).") {
            toast.error("Incorrect Password!!");
        }
        else if (error === "Firebase: Error (auth/user-not-found).") {
            toast.error("User Not Found!!");
        }
        else {
            toast.error("There was an error. please try again!!");
        }
    };

    // All Auth Providers.
    const auth = getAuth();

    // Create an User/Register User.
    const registerNewUser = (name, email, password, navigate) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setAuthError('');
                const date = new Date();
                const fullDate = date.toString();
                const time = new Date().toLocaleString();
                const newUser = { created: fullDate, createdTime: time, photoURL: nanUser, email, displayName: name, phoneNumber: null };
                setUser(newUser);
                // Show Toast Alert.
                toastRegister();
                // save db
                saveUserDatabase(newUser.created, newUser.createdTime, email, newUser.displayName, newUser.phoneNumber, 'POST');
                // Set name
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => { })
                    .catch((error) => { });
                navigate('/');
            })
            .catch((error) => {
                setAuthError(error.message);
                toastError(error.message);
            })
            .finally(() => setLoading(false));
    };

    // Login User With Email & Password.
    const loginUser = (email, password, location, navigate) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                toastLogin();
                setAuthError('');
            })
            .catch((error) => {
                toastError(error.message);
            })
            .finally(() => setLoading(false));
    };

    // User Logout/SignOut
    const logout = () => {
        setLoading(true);
        signOut(auth).then(() => {

        }).catch((error) => {

        })
            .finally(() => setLoading(false));
    };

    // User Observation.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                    .then(idToken => localStorage.setItem("Auth_Token", idToken))
                setUser(user);
            }
            else {
                setUser({});
            }
            setLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);

    // Save User Info On Database.
    const saveUserDatabase = (created, createdTime, email, displayName, phoneNumber, method) => {
        const user = { created, createdTime, email, displayName, phoneNumber };
        fetch("https://salty-refuge-12238.herokuapp.com/users", {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    };

    return {
        loginUser,
        registerNewUser,
        logout,
        user,
        loading,
        authError
    };
};

export default useFirebase;