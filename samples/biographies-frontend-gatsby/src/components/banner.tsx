import React from "react"
import styles from "./banner.module.css"

export const Banner: React.FC = () => (
  <div className={styles.container}>
    <img className={styles.img} src={"images/optimizely.jpg"} />
  </div>
)
