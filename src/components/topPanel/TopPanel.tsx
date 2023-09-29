import { Dispatch, Ref, SetStateAction, forwardRef } from 'react';
import useWindowSize from '@hooks/useWindowSize';

import * as styles from './topPanel.module.css';
import { BREAKPOINTS, ROUTES } from '@constants/constants';

interface TopPanelProps {
    setIsMobileMenuActive: Dispatch<SetStateAction<boolean>>;
}

const TopPanel = forwardRef(function (
    { setIsMobileMenuActive }: TopPanelProps,
    ref: Ref<HTMLButtonElement>
) {
    const deviceWidth = useWindowSize();
    return (
        <header className={styles.root}>
            <img className={styles.logo} src="/icons/logo.svg" alt="Space logo" />
            {deviceWidth >= BREAKPOINTS.desktop && (
                <div className={styles.topPanelLine} />
            )}
            {deviceWidth >= BREAKPOINTS.tablet ? (
                <nav>
                    <ul>
                        {Object.values(ROUTES).map((route, index) => {
                            return (
                                <li key={route.name}>
                                    <a
                                        className={({ isActive }) =>
                                            isActive && styles.activeLink
                                        }
                                        href={route.path}
                                    >
                                        {deviceWidth >= BREAKPOINTS.desktop && (
                                            <span className={styles.bold}>
                                                0{index}
                                            </span>
                                        )}
                                        <span>{route.name}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            ) : (
                <button
                    ref={ref}
                    className={styles.hamburgerBtn}
                    onClick={(e) => {
                        setIsMobileMenuActive(true);
                    }}
                >
                    <img src="/icons/icon-hamburger.svg" alt="Hamburger menu icon" />
                </button>
            )}
        </header>
    );
});

export default TopPanel;
