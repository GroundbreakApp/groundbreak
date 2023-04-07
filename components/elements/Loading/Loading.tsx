import styles from './Loading.module.css'

export const Loading = () => {
  return <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
}