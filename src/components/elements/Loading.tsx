import React from 'react'
import styles from '~/styles/components/elements/loading.module.scss'

export const Loading = () => {
  return (
    <div className={styles.container}>
      <section className={styles.loading}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </section>
    </div>
  )
}
