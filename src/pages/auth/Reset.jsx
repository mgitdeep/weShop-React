import styles from './Auth.module.scss'
import forgotImg from "../../assets/forgot.png"
import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'

const Reset = () => {
  return (
    <section className={` ${styles.auth}`}>
      
      <div className={styles.img}>
        <img src={forgotImg} alt="login" width="400"/>
      </div>

      <Card>
        <div className={styles.form}>
          <h2>Reset Password</h2>
          <form>
            <input type="text" placeholder='Email' required/>

            <button className='--btn --btn-primary --btn-block'>Reset Password</button>

          
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