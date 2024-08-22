
import style from './style.module.scss'

const NotFound = () => {
  return (
    <div className={style.container}>
      <h1 className={style.errorCode}>404</h1>
      <h2 className={style.errorMessage}>Page Not Found</h2>
      <p className={style.description}>The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className={style.homeLink}>Go to Home</a>
    </div>
  )
}

export default NotFound
