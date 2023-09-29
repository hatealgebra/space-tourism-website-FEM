import PageTemplate from '@templates/page.template';

import * as styles from './technologyPage.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';
import clsx from 'clsx';
import useCarousel from '@hooks/useCarousel';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINTS } from '@constants/constants';
import { useEffect, useRef, useState } from 'react';

import image from '@images/technology/image-launch-vehicle-portrait.jpg';

interface TechnologyPageProps {
    technologyData: Array<ITechnologyData>;
}

const TechnologyPage = ({ technologyData }: TechnologyPageProps) => {
    const [gridDirection, setGridDirection] = useState({
        gridTemplateColumns: `repeat(${technologyData.length}, 100%)`,
    });
    const windowWidth = useWindowSize();
    const carouselGalleryRef = useRef(null);

    const { position, currentData, onClickMenuButton, onScroll } = useCarousel({
        carouselGalleryRef,
        data: technologyData,
        hasVerticalScroll: true,
    });

    useEffect(() => {
        if (windowWidth > BREAKPOINTS.desktop) {
            return setGridDirection({
                gridTemplateRows: `repeat(${technologyData.length}, 100%)`,
            });
        }
        return setGridDirection({
            gridTemplateColumns: `repeat(${technologyData.length}, 100%)`,
        });
    }, [windowWidth]);

    return (
        <PageTemplate
            styles={styles}
            headingNumber="3"
            headingText="Space Launch 101"
        >
            <div className={styles.contentContainer}>
                <div className={styles.technologyCarousel}>
                    <div
                        onScroll={(e) =>
                            onScroll(e, windowWidth > BREAKPOINTS.desktop)
                        }
                        className={clsx(
                            sharedStyles.carouselGallery,
                            styles.technologyGallery
                        )}
                        role="list"
                        ref={carouselGalleryRef}
                        style={gridDirection}
                    >
                        {technologyData.map(({ images, name }) => {
                            const orientation =
                                windowWidth > BREAKPOINTS.desktop
                                    ? 'portrait'
                                    : 'landscape';
                            const imageUrl = new URL(
                                images[orientation],
                                import.meta.url
                            );

                            return (
                                <img
                                    role="listitem"
                                    key={`${name}-technology-image`}
                                    src={imageUrl.toString()}
                                />
                            );
                        })}
                    </div>
                </div>
                <menu className={styles.menuControls}>
                    {technologyData.map((_, index) => (
                        <button
                            key={`${index}-technology-button`}
                            onClick={() => onClickMenuButton(index)}
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
