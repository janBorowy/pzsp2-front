import styles from "../styles/notLoggedInPage.module.css";
import {useRouter} from "next/router";

const NotLoggedInPage = () => {
    const router = useRouter()

    function goToLoginPage() {
        router.push("/login")
    }

    return <div className={styles.page}>
        <div className={styles.messageContainer}>
            <h1>Please log in first</h1>
            <button className={styles.button} onClick={goToLoginPage}>Go to login page</button>
        </div>
    </div>
}

export default NotLoggedInPage;