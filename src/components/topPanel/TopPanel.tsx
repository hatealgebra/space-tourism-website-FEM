import { Dispatch, Ref, SetStateAction, forwardRef } from 'react';
import useWindowSize from '@hooks/useWindowSize';

import logo from '@shared/logo.svg';
import iconHamburger from '@shared/icon-hamburger.svg';
import * as styles from './topPanel.module.css';
import { BREAKPOINTS, ROUTES } from '@constants/constants';
import { NavLink } from 'react-router-dom';

interface TopPanelProps {
    setIsMobileMenuActive: Dispatch<SetStateAction<boolean>>;
}

const TopPanel = forwardRef(function (
    { setIsMobileMenuActive }: TopPanelProps,
    ref: Ref<HTMLButtonElement>
) {
    const deviceWidth = useWindowSize();
    console.log(Object.values(ROUTES));
    return (
        <header className={styles.root}>
            <img className={styles.logo} src={logo} alt="Space logo" />
            {deviceWidth >= BREAKPOINTS.desktop && (
                <div className={styles.topPanelLine} />
            )}
            {deviceWidth >= BREAKPOINTS.tablet ? (
                <nav>
                    <ul >
                        {Object.values(ROUTES).map((route, index) => {
                            return (
                                <li
                                key={route.name}
                                >
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive && styles.activeLink
                                        }
                                        to={route.path}
                                    >
                                        {deviceWidth >= BREAKPOINTS.desktop && (
                                            <span className={styles.bold}>
                                                0{index}
                                            </span>
                                        )}
                                        <span>{route.name}</span>
                                    </NavLink>
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
                    <img src={iconHamburger} alt="Hamburger menu icon" />
                </button>
            )}
        </header>
    );
});

export default TopPanel;
