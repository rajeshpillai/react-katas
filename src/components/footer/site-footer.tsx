import styles from './site-footer.module.css'

const COMPANY_URL = 'https://www.algorisys.com'

export function SiteFooter() {
    return (
        <footer className={styles.footer}>
            <p className={styles.credit}>
                Developed by Rajesh Pillai at{' '}
                <a
                    href={COMPANY_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.link}
                >
                    Algorisys Technologies
                </a>
            </p>
            <p className={styles.copyright}>
                <span aria-hidden="true">©</span> Rajesh Pillai. Licensed under AGPL-3.0-or-later.
            </p>
        </footer>
    )
}
