// Fully functional User Registration page!

import styles from './Auth.module.scss'
import registerImg from "../../assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { useState } from 'react'

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Firebase integration
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import Loader from '../../components/loader/Loader'

const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpass, setConfirmpass] = useState("")
  const [loader, setLoader] = useState(false)

  const navigateToLogin = useNavigate()

  const handleRegister = (f) => {
    f.preventDefault()
    // console.log(email, password, confirmpass)

    if ( password !== confirmpass ) {
      toast.error("Password do not match!")
    } else if ( email === "" || password === "" || confirmpass === "") {
      toast.error("Please enter details")
    } else {

      setLoader(true)
      // Integrating with Firebase
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       
        const user = userCredential.user;
        console.log(user)

        setLoader(false)

        toast.success("Successfully Registered!")
        navigateToLogin("/login")
     
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
      setConfirmpass("")
    }

    
  }

  return (
    <>
    <ToastContainer />
      { loader && <Loader />}
      <section className={` ${styles.auth}`}>
        
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form>
              <input type="text" placeholder='Email' required
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>

              <input type="password" placeholder='Password' required
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>

              <input type="password" placeholder='Confirm Password' required
              value={confirmpass}
              onChange={(e) => setConfirmpass(e.target.value)}/>

              <button className='--btn --btn-primary --btn-block' onClick={handleRegister}>Register</button>

            </form>
            <span className={styles.register}>
              <p>Already Registered?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>

        <div className={styles.img}>
          <img src={registerImg} alt="login" width="400"/>
        </div>
        
      </section>
    </>
  )
}

export default Register