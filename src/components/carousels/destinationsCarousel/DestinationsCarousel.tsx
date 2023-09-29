import * as sharedStyles from '@styles/sharedStyles.module.css';
import * as styles from './destinationsCarousel.module.css';

import { useRef } from 'react';
import useCarousel from '@hooks/useCarousel';
import clsx from 'clsx';

import data from '@static/data.json';

enum EDESTINATIONS {
    MOON = 'MOON',
    MARS = 'MARS',
    EUROPA = 'EUROPA',
    TITAN = 'TITAN',
}

const DestinationPage = () => {
    const carouselGalleryRef = useRef(null);

    const { position, currentData, onClickMenuButton, onScroll } = useCarousel({
        carouselGalleryRef,
        data: data.destinations,
    });

    return (
        <>
            <div
                onScroll={(e) => onScroll(e)}
                ref={carouselGalleryRef}
                className={clsx(
                    sharedStyles.carouselGallery,
                    styles.planetsGallery
                )}
                style={{
                    gridTemplateColumns: `repeat(${data.destinations.length}, 100%)`,
                }}
            >
                {data.destinations.map(({ images, name }) => {
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
                        onClick={(e) => onClickMenuButton(i)}
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
        </>
    );
};

export default DestinationPage;
