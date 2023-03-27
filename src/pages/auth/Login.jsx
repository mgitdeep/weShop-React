// Fully functional Login & Login with Google page!

import styles from './Auth.module.scss'
import loginImg from "../../assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import { BsGoogle } from 'react-icons/bs'
import Card from '../../components/card/Card'
import { useState } from 'react'
import Loader from '../../components/loader/Loader'

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Firebase integration & Also integrating Login with Google functionality
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/config'


const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader, setLoader] = useState(false)

  const navigateTo = useNavigate()

  const handleLogin = (f) => {
    f.preventDefault()
    // console.log(email, password, confirmpass)
    if ( email === "" || password === "") {
      toast.error("Please enter details")
    } else {

      setLoader(true)
      // Integrating with Firebase
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)

        setLoader(false)

        toast.success("Login Successful!")
        navigateTo("/")
     
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage.slice(10))
        toast.error(errorMessage.slice(10))                 // we added this line :)

        setLoader(false)
      
      });

      setEmail("")
      setPassword("")
    }
  }

  // Login with Google
  const provider = new GoogleAuthProvider();
  
  const loginWithGoogle = () => {

    signInWithPopup(auth, provider)
    .then((result) => {

      // The signed-in user info.
      const user = result.user;
      console.log(user)
      toast.success("Login Successful!")

      navigateTo("/")

    }).catch((error) => {
      
      toast.error(error.message)
    });
  }

  return (
    <>
    <ToastContainer />
    { loader && <Loader />}
    <section className={` ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="login" width="400"/>
      </div>

      <Card>
        <div className={styles.form}>
          <h2>Login</h2>
          <form>
            <input type="text" placeholder='Email' required
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" placeholder='Password' required
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            <button className='--btn --btn-primary --btn-block' onClick={handleLogin}>Login</button>

            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>-- or --</p>
            <button className='--btn --btn-danger --btn-block' onClick={loginWithGoogle}><BsGoogle />Login with Google</button>
          </form>
          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
      
    </section>
    </>
  )
}

export default Login