import styles from './TopBar.module.css';

function TopBar() {
    return (
        <header className={styles.head}>
            <h1 className={styles.heading}>Smile Rewards</h1>
            <p className={styles.below}>Unlock happiness and earn rewards for your genuine smiles!</p>
        </header>
    )
}

export default TopBar;