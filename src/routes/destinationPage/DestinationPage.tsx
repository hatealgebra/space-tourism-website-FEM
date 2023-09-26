import PageTemplate from '@templates/page.template';

import * as sharedStyles from '@styles/sharedStyles.module.css';
import * as styles from './destinationPage.module.css';


import {  useRef } from 'react';
import useCarousel from '@hooks/useCarousel';
import clsx from 'clsx';

import imageEuropa from '@images/destination/image-europa.webp';
import imageMars from '@images/destination/image-mars.webp';
import imageMoon from '@images/destination/image-moon.webp';
import imageTitan from '@images/destination/image-titan.webp';

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
            >
                <img src={imageMoon} alt="Image of Moon" />
                <img src={imageMars} alt="Image of Mars" />
                <img src={imageEuropa} alt="Image of Europa" />
                <img src={imageTitan} alt="Image of Titan" />
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
