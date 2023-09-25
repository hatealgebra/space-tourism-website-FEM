import {
    Dispatch,
    Ref,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import * as styles from './destinationCarousel.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';

import imageEuropa from '@images/destination/image-europa.webp';
import imageMars from '@images/destination/image-mars.webp';
import imageMoon from '@images/destination/image-moon.webp';
import imageTitan from '@images/destination/image-titan.webp';
import clsx from 'clsx';

enum EDESTINATIONS {
    MOON = 'MOON',
    MARS = 'MARS',
    EUROPA = 'EUROPA',
    TITAN = 'TITAN',
}

interface CarouselProps {
    headingNumber: string;
    headingText: string;
    currentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const Carousel = ({ currentIndex, setCurrentIndex }: CarouselProps) => {


    const destinationGalleryRef = useRef(null);
    const menuRef = useRef(null);

    const setClickPosition = (
        e: MouseEvent,
        galleryRef: Ref<HTMLDivElement>,
        index: number
    ) => {
        e.preventDefault();

        if (galleryRef === null || e.target === null) return;

        const chosenElement = galleryRef.current.children[index];
        chosenElement.scrollIntoView({ behavior: 'smooth' });
        
        setCurrentIndex(index);

    };


    return (
        <>
            <div
                ref={destinationGalleryRef}
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
            <div ref={menuRef} className={styles.chooseMenu}>
                {Object.keys(EDESTINATIONS).map((destinationKey, i) => (
                    <button
                    className={clsx(currentIndex === i && styles.activeButton)}
                        key={`${destinationKey}-planet`}
                        onClick={(e) =>
                            setClickPosition(e, destinationGalleryRef, i)
                        }
                    >
                        {destinationKey}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Carousel;
