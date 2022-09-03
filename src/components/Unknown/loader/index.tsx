import styles from './styles.module.scss';

const Loader = () => {
    return(
        <div className={styles.loader}>
            <div className={styles.dotLoader} />
            <div className={styles.dotLoader} />
            <div className={styles.dotLoader} />
        </div>
    )
}

export default Loader;