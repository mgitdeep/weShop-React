import styles from './Auth.module.scss'
import registerImg from "../../assets/register.png"
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { useState } from 'react'

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpass, setConfirmpass] = useState("")

  const handleRegister = (f) => {
    f.preventDefault()
    // console.log(email, password, confirmpass)

    if ( password !== confirmpass ) {
      toast.error("Password do not match!")
    } else {
      toast.success("Successfully Registered!")

      setEmail("")
      setPassword("")
      setConfirmpass("")
    }

    
  }

  return (
    <>
    <ToastContainer />
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