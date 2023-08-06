import PageTemplate from '@templates/page.template';
import { useState } from 'react';

import * as styles from './technologyPage.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';
import clsx from 'clsx';
import useCarousel from '@hooks/useCarousel';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINTS } from '@constants/constants';

interface TechnologyPageProps {
    technologyData: Array<ITechnologyData>;
}

const TechnologyPage = ({ technologyData }: TechnologyPageProps) => {
    const windowWidth = useWindowSize();
    const {
        position,
        currentData,
        carouselGalleryRef,
        onScroll,
        onClickMenuButton,
    } = useCarousel({ data: technologyData });

    return (
        <PageTemplate
            styles={styles}
            headingNumber="3"
            headingText="Space Launch 101"
        >
            <div className={styles.contentContainer}>
                <div className={styles.technologyCarousel}>
                    <div
                        className={clsx(
                            sharedStyles.carouselGallery,
                            styles.technologyGallery
                        )}
                        onScroll={(e) => onScroll(e)}
                        ref={carouselGalleryRef}
                    >
                        {technologyData.map(({ images, name }) => (
                            <img
                                key={`${name} landscape`}
                                src={
                                    images[
                                        windowWidth > BREAKPOINTS.desktop
                                            ? 'portrait'
                                            : 'landscape'
                                    ]
                                }
                            />
                        ))}
                    </div>
                </div>
                <menu className={styles.menuControls}>
                    {technologyData.map((_, index) => (
                        <button
                            onClick={() =>
                                onClickMenuButton(carouselGalleryRef, index)
                            }
                            className={clsx(
                                index === position && styles.active
                            )}
                        >
                            {index + 1}
                        </button>
                    ))}
                </menu>
                <section className={styles.textContent}>
                    <span className={sharedStyles.subTwo}>
                        The Terminology ...
                    </span>
                    <h3>{currentData.name}</h3>
                    <p>{currentData.description}</p>
                </section>
            </div>
        </PageTemplate>
    );
};

export default TechnologyPage;
