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
    curentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const Carousel = ({ currentIndex, setCurrentIndex }: CarouselProps) => {
    const [clickedButton, setClickedButton] = useState(false);
    const destinationGalleryRef = useRef(null);
    const [scrollThrottle, setScrollThrottle] = useState(false);
    const menuRef = useRef(null);

    const [underlinePosition, setUnderlinePosition] = useState<{
        width: number;
        offsetLeft: number;
    }>({
        width: 0,
        offsetLeft: 0,
    });

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (clickedButton) return;
        if (scrollThrottle) return;

        setScrollThrottle(true);

        const width = e.target.clientWidth;
        const numberOfDestinations = menuRef.current.children.length;

        for (let i = 0; i < numberOfDestinations - 1; i++) {
            const scrollDimension = width * i;
            if (e.target.scrollLeft >= scrollDimension) {
                setCurrentIndex(i);
            }
        }

        setTimeout(() => {
            setScrollThrottle(false);
        }, 150);
    };

    const setClickPosition = (
        e: MouseEvent,
        galleryRef: Ref<HTMLDivElement>,
        index: number
    ) => {
        setClickedButton(true);
        e.preventDefault();

        if (galleryRef === null || e.target === null) return;

        const scrollBy = galleryRef.current.clientWidth * index;
        galleryRef.current.scrollLeft = scrollBy;
        setCurrentIndex(index);
        setUnderlinePosition({
            width: e.target.clientWidth,
            offsetLeft: e.target.offsetLeft,
        });

        setTimeout(() => {
            setClickedButton(false);
        }, 500);
    };

    useEffect(() => {
        if (menuRef.current === null) return;
        const width = menuRef.current.children[currentIndex]?.clientWidth;
        const offsetLeft = menuRef.current.children[currentIndex]?.offsetLeft;

        setUnderlinePosition({ width, offsetLeft });
    }, [currentIndex]);

    return (
        <>
            <div
                onScroll={(e) => onScroll(e)}
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
                        key={`${destinationKey}-planet`}
                        onClick={(e) =>
                            setClickPosition(e, destinationGalleryRef, i)
                        }
                    >
                        {destinationKey}
                    </button>
                ))}
                <span
                    className={styles.menuUnderline}
                    style={{
                        width: underlinePosition.width,
                        left: underlinePosition.offsetLeft,
                    }}
                />
            </div>
        </>
    );
};

export default Carousel;
