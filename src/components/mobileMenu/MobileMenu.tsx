import { Dispatch, ForwardedRef, SetStateAction, forwardRef } from 'react';
import clsx from 'clsx';

import * as styles from './mobileMenu.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';
import { ROUTES } from '@constants/constants';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
    isMobileMenuActive?: boolean;
    setIsMobileMenuActive: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu = forwardRef(function (
    { isMobileMenuActive, setIsMobileMenuActive }: MobileMenuProps,
    ref: ForwardedRef<HTMLDivElement>
) {
    return (
        <div
            ref={ref}
            className={clsx(styles.root, isMobileMenuActive && styles.isActive)}
        >
            <button
                className={styles.closeBtn}
                onClick={(e) => {
                    setIsMobileMenuActive(false);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                >
                    <rect
                        x="2.5752"
                        y="0.954102"
                        width="24"
                        height="3"
                        transform="rotate(45 2.5752 0.954102)"
                        fill="#D0D6F9"
                    />
                    <rect
                        x="0.454102"
                        y="17.9246"
                        width="24"
                        height="3"
                        transform="rotate(-45 0.454102 17.9246)"
                        fill="#D0D6F9"
                    />
                </svg>
            </button>
            <nav>
                <ul>
                    {ROUTES.map((arr, i) => (
                        <li key={`${arr.name}-link`}>
                            <Link
                                onClick={() => setIsMobileMenuActive(false)}
                                to={arr.path}
                            >
                                <span>{`0${i}`}</span>
                                <span>{arr.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={sharedStyles.footerMobile}>
                Challenge by
                <a
                    href="https://www.frontendmentor.io?ref=challenge"
                    target="_blank"
                >
                    Frontend Mentor
                </a>
                .<br /> Coded by{' '}
                <a href="https://github.com/hatealgebra">Paul</a>.
            </div>
        </div>
    );
});

export default MobileMenu;
