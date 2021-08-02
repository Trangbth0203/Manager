import React, { FC, ChangeEvent } from 'react'
import styles from '~/styles/components/elements/search.module.scss'

interface Props {
  onChangeValue: (value: string) => void
}

export const Search: FC<Props> = ({ onChangeValue }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value)
  }

  return (
    <div className={styles.search}>
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        onChange={onChange}
      />
    </div>
  )
}
