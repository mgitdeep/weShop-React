import styles from './Auth.module.scss'
import loginImg from "../../assets/login.png"
import { Link } from 'react-router-dom'
import { BsGoogle } from 'react-icons/bs'
import Card from '../../components/card/Card'


const Login = () => {
  return (
    <section className={` ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="login" width="400"/>
      </div>

      <Card>
        <div className={styles.form}>
          <h2>Login</h2>
          <form>
            <input type="text" placeholder='Email' required/>
            <input type="password" placeholder='Password' required/>

            <button className='--btn --btn-primary --btn-block'>Login</button>

            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>-- or --</p>
            <button className='--btn --btn-danger --btn-block'><BsGoogle />Login with Google</button>
          </form>
          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
      
    </section>
  )
}

export default Login