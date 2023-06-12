import { Link } from "gatsby"
import React from "react"
import styles from "./topBar.module.css"

export const TopBar: React.FC = () => (
  <div className={styles.container}>
    <Link to="/" className={styles.link}>Home</Link>
    <Link to="/bookStore" className={styles.link}>Book Store</Link>
    <Link to="/search" className={styles.link}>Search</Link>
  </div>
)
