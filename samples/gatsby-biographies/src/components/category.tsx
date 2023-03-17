import { Link } from "gatsby";
import React from "react"
import { BookNode } from "../models/bookNode";
import style from "./category.module.css";

type CategoryProps = {
    nodes: BookNode[]
}

export const Category: React.FC<CategoryProps> = ({ nodes = [] }) => (
    <div className={style.category}>
        {nodes.map((node, i) => {
            return (
                <Link key={i} className={style.link} to={`/bookStore/${node.Code}`}>{node.Name}</Link>
            )
        })}
    </div>
);
