import React, { useState } from 'react'
import style from './style.module.scss'

interface IGroupFormProps {
  addGroup: (name: string, description: string) => void
}

const GroupForm = ({ addGroup }: IGroupFormProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && description) {
      addGroup(name, description)
      setName('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className={style.submitButton}>Add Group</button>
    </form>
  )
}

export default GroupForm
