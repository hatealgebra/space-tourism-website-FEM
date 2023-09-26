import PageTemplate from '@templates/page.template';

import * as styles from './technologyPage.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';
import clsx from 'clsx';
import useCarousel from '@hooks/useCarousel';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINTS } from '@constants/constants';
import { useRef } from 'react';

interface TechnologyPageProps {
    technologyData: Array<ITechnologyData>;
}

const TechnologyPage = ({ technologyData }: TechnologyPageProps) => {
    const windowWidth = useWindowSize();
    const carouselGalleryRef = useRef(null);

    const {
        position,
        currentData,
        onClickMenuButton,
    } = useCarousel({ carouselGalleryRef, data: technologyData, hasVerticalScroll: true });


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
                        role='list'
                        ref={carouselGalleryRef}
                        style={{gridTemplateColumns: `repeat(${technologyData.length}, 100%)`}}
                    >
                        {technologyData.map(({ images, name }) => (
                            <img
                                role='listitem'
                                key={`${name}-technology-image`}
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
                            key={`${index}-technology-button`}
                            onClick={() =>
                                onClickMenuButton(index)
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
