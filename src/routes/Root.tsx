import PageTemplate from '../templates/page.template';
import * as styles from './root.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';

type Props = {};

const Root = (props: Props) => {
    return (
        <PageTemplate styles={styles}>
            <div className={styles.contentContainer}>
                <div className={styles.textContent}>
                    <span className={sharedStyles.subThree}>
                        SO, YOU WANT TO TRAVEL TO
                    </span>
                    <h1>Space</h1>
                    <p>
                        Let’s face it; if you want to go to space, you might as
                        well genuinely go to outer space and not hover kind of
                        on the edge of it. Well sit back, and relax because
                        we’ll give you a truly out of this world experience!
                    </p>
                </div>
                <div className={styles.lpBtn}>
                    <div />
                    <a href="">EXPLORE</a>
                </div>
            </div>
        </PageTemplate>
    );
};

export default Root;
