import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import { MENUS, IMenu } from '~/src/models/index'
import styles from '~/styles/components/widgets/sidebar.module.scss'

export const Sidebar = () => {
  const router = useRouter()

  return (
    <div className={classnames(styles.sidebar)}>
      {MENUS.map((menu: IMenu, index: number) => (
        <Link key={index} href={menu.href}>
          <a className={router.pathname === menu.href ? styles.activeMenu : ''}>{menu.name}</a>
        </Link>
      ))}
    </div>
  )
}
