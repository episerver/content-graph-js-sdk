import { Link } from "gatsby"
import React from "react"
import { BiographyPreview } from "../models/biography"
import styles from "./biography-list.module.css"

type BiographiesProps = {
  biographies: BiographyPreview[]
}

const BiographyItem: React.FC<{ biography: BiographyPreview }> = ({
  biography: { RouteSegment, Name, Born, Die },
}) => {
  var bornYear = Born !== undefined ? new Date(Born).getFullYear() : ""
  var deathYear = Die !== undefined ? new Date(Die).getFullYear() : ""

  return (
    <Link className={styles.bioItem} to={`/biography/${RouteSegment}`}>
      <img className={styles.bioImage} src={`images/${RouteSegment}.jpg`} />
      <div className={styles.bioDescription}>
        <span className={styles.bioName}>{Name}</span>
        <span>
          ({bornYear} - {deathYear})
        </span>
      </div>
    </Link>
  )
}

export const BiographyList: React.FC<BiographiesProps> = ({ biographies = [] }) => (
  <div className={styles.container}>
    <h2 className={styles.heading}>Biographies</h2>
    <div className={styles.bioListContainer}>
      {
      biographies.map((biography) => (
        <BiographyItem key={biography.RouteSegment} biography={biography} />
      ))}
    </div>
  </div>
)
