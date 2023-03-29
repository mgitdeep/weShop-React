import styles from './Auth.module.scss'
import forgotImg from "../../assets/forgot.png"
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify'
import { auth } from '../../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import Loader from '../../components/loader/Loader'

const Reset = () => {

  const [email, setEmail] = useState("")
  const [loader, setLoader] = useState(false)

  const handleReset = (f) => {
    f.preventDefault()

    if (email) {
      setLoader(true)
      sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setLoader(false)
        toast.success("Check your email for Reset link!")
    })
      .catch((error) => {
        toast.error(error.message.slice(10))
        setLoader(false)
    });
    
  } else {
    toast.error("Enter your email!")
    setLoader(false)
  }
  }

  return (
    <section className={` ${styles.auth}`}>
      { loader && <Loader />}                         {/* // if loader is True then show the <Loader />  */}
      <div className={styles.img}>
        <img src={forgotImg} alt="login" width="400"/>
      </div>

      <Card>
        <div className={styles.form}>
          <h2>Reset Password</h2>
          <form>
            <input type="text" placeholder='Email' required
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>

            <button className='--btn --btn-primary --btn-block' onClick={handleReset}>Reset Password</button>

          
            <div className={styles.links}>
              <p>
                <Link to="/register">Register</Link>
              </p>
              <p>
              <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
      
    </section>
  )
}

export default Reset