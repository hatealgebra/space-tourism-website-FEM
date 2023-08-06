import PageTemplate from '@templates/page.template';

import * as sharedStyles from '@styles/sharedStyles.module.css';
import * as styles from './destinationPage.module.css';
import Carousel from '@components/destinationCarousel/DestinationCarousel';

import dataJSON from '@static/data.json';
import { useEffect, useState } from 'react';

type Props = {};

const DestinationPage = () => {
    const { destinations } = dataJSON;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [destData, setDestData] = useState(destinations[0]);

    const { name, description, distance, travel } = destData;

    useEffect(() => {
        setDestData(destinations[currentIndex]);
    }, [currentIndex]);

    return (
        <PageTemplate
            styles={styles}
            headingNumber="01"
            headingText="Pick your destination"
        >
            <div className={styles.contentContainer}>
                <Carousel
                    headingNumber="01"
                    headingText="Pick Your Destination"
                    setCurrentIndex={setCurrentIndex}
                />
                <div className={styles.textContent}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={sharedStyles.subTwo}>
                                Avg. Distance
                            </span>
                            <span>{distance}</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={sharedStyles.subTwo}>
                                Est. travel time
                            </span>
                            <span>{travel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};

export default DestinationPage;
