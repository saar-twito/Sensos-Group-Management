import React from 'react'
import style from './style.module.scss'

interface SectionHeaderProps {
  title: string
  description: string
}

const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className={style.sectionHeader}>
      <h2>{title}</h2>
      <p>{description}</p>
      <hr />
    </div>
  )
}

export default SectionHeader
