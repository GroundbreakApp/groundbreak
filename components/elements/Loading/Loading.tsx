import styles from './Loading.module.css'

export const Loading = () => {
  return <div
    className='absolute left-0 right-0 top-0 bottom-0 m-auto z-[99999] pointer-events-none flex items-center justify-center'
  >
    <div className={styles['lds-roller']}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
}