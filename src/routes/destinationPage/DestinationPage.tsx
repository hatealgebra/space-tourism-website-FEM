import PageTemplate from '@templates/page.template';

import * as sharedStyles from '@styles/sharedStyles.module.css';
import * as styles from './destinationPage.module.css';


import {  useRef } from 'react';
import useCarousel from '@hooks/useCarousel';
import clsx from 'clsx';

enum EDESTINATIONS {
    MOON = 'MOON',
    MARS = 'MARS',
    EUROPA = 'EUROPA',
    TITAN = 'TITAN',
}

interface DestinationPageProps {
    destinationsData: Array<IDestinationData>;
}

const DestinationPage = ({ destinationsData }: DestinationPageProps) => {

    const carouselGalleryRef = useRef(null);


    const {
        position,
        currentData,
        onClickMenuButton,
        onScroll
    } = useCarousel({
        carouselGalleryRef,
        data: destinationsData,
    })

    return (
        <PageTemplate
            styles={styles}
            headingNumber="01"
            headingText="Pick your destination"
        >
            <div className={styles.contentContainer}>
            <div
                onScroll={e => onScroll(e)}
                ref={carouselGalleryRef}
                className={clsx(
                    sharedStyles.carouselGallery,
                    styles.planetsGallery
                )}
                style={{gridTemplateColumns: `repeat(${destinationsData.length}, 100%)`}}
            >
                {destinationsData.map(({ images, name }) => {
                    return (
                        <img
                            key={`${name}-planet-image`}
                            src={images.webp}
                            alt={`Image of ${name}`}
                        />
                    );
                })}
            </div>
            <div className={styles.chooseMenu}>
                {Object.keys(EDESTINATIONS).map((destinationKey, i) => (
                    <button
                    className={clsx(position === i && styles.activeButton)}
                        key={`${destinationKey}-planet`}
                        onClick={(e) =>
                            onClickMenuButton(i)
                        }
                    >
                        {destinationKey}
                    </button>
                ))}
            </div>
                <div className={styles.textContent}>
                    <h2>{currentData.name}</h2>
                    <p>{currentData.description}</p>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={sharedStyles.subTwo}>
                                Avg. Distance
                            </span>
                            <span>{currentData.distance}</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={sharedStyles.subTwo}>
                                Est. travel time
                            </span>
                            <span>{currentData.travel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};

export default DestinationPage;
