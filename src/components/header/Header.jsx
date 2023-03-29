// Logout functionality added!

import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useEffect, useState } from "react";

// Firebase integration
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        we<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaShoppingCart size={21} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({isActive}) => ( isActive ? `${styles.active}` : "" )


const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  // Monitor currently Signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.displayName)

        setDisplayName(user.displayName)

      } else {
        // User is signed out
        // ...
      }
    });

  }, [])
  

  const navigateToHome = useNavigate()

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("You've Logged out!")
      // Sign-out successful.
      setDisplayName("")
      navigateToHome("/")
    }).catch((error) => {
      // An error happened.
      toast.error(error.message)
    });
  }

  return (
    <header>
      <ToastContainer />
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div onClick={hideMenu} className={ showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`}></div>
            
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu}/>
              </li>
              <li>
                <NavLink to="/" className={activeLink}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>Contact</NavLink>
              </li>
            </ul>

            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}> 
                <NavLink to="#"><FaUserCircle size={16} /> Hi, {displayName}</NavLink>
                <NavLink to="/login" className={activeLink}>Login</NavLink>
                <NavLink to="/register" className={activeLink}>Register</NavLink>
                <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
                <NavLink to="/" onClick={logoutUser}>Logout</NavLink>
              </span>
              {cart}
            </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}/>
        </div>
      </div>
    </header>
  );
};

export default Header;
