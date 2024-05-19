import styles from "../styles/notLoggedInPage.module.css";
import {useRouter} from "next/router";

const NotLoggedInPage = () => {
    const router = useRouter()

    function goToLoginPage() {
        router.push("/login")
    }

    return <div className={styles.page}>
        <div className={styles.messageContainer}>
            <h1>Nie jesteś zalogowany</h1>
            <button className={styles.button} onClick={goToLoginPage}>Zaloguj się</button>
        </div>
    </div>
}

export default NotLoggedInPage;