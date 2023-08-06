import React, { useEffect, useRef, useState } from 'react';
import TopPanel from '../components/topPanel/TopPanel';
import MobileMenu from '../components/mobileMenu/MobileMenu';
import * as templateStyles from './page.template.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';
import clsx from 'clsx';

type TPageTemplate = {
    children: React.ReactNode;
    headingNumber?: string;
    headingText?: string;
    styles: Object;
};

const PageTemplate = ({
    children,
    headingNumber,
    headingText,
    styles,
}: TPageTemplate) => {
    const [windowSize, setWindowSize] = useState(0);
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    const mobileMenuRef = useRef(null);
    const hamburgerBtnRef = useRef(null);

    const handleClick = (e: Event) => {
        const targetElement = e.target;
        const mobileMenu = mobileMenuRef?.current;
        const hamburgerBtn = hamburgerBtnRef?.current;
        e.preventDefault();

        if (mobileMenu === null) return;
        if (hamburgerBtn === null) return;

        if (
            !mobileMenu.contains(targetElement) &&
            !hamburgerBtn.contains(targetElement)
        ) {
            setIsMobileMenuActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className={clsx(templateStyles.root, styles.backgroundContainer)}>
            <TopPanel
                ref={hamburgerBtnRef}
                setIsMobileMenuActive={setIsMobileMenuActive}
            />
            <MobileMenu
                ref={mobileMenuRef}
                isMobileMenuActive={isMobileMenuActive}
                setIsMobileMenuActive={setIsMobileMenuActive}
            />
            <div className={templateStyles.content}>
                {headingNumber && headingText && (
                    <h2
                        className={clsx(
                            sharedStyles.subOne,
                            templateStyles.subHeading
                        )}
                    >
                        <span>{headingNumber}</span>
                        <span>{headingText}</span>
                    </h2>
                )}
                {children}
            </div>
        </div>
    );
};

export default PageTemplate;
