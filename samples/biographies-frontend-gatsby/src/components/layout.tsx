import React from "react"
import styles from "./layout.module.css"
import { TopBar } from "./topBar"

export const Layout: React.FC = ({ children }) => (
  <div className={styles.container}>
    <TopBar />
    {children}
  </div>
)
