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
    setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const Carousel = ({ setCurrentIndex }: CarouselProps) => {
    const destinationGalleryRef = useRef(null);
    const menuRef = useRef(null);
    useState;
    const [underlinePosition, setUnderlinePosition] = useState<{
        width: number;
        offsetLeft: number;
    }>({
        width: 0,
        offsetLeft: 0,
    });

    console.log(underlinePosition);

    const setClickPosition = (
        e: MouseEvent,
        galleryRef: Ref<HTMLDivElement>,
        index: number
    ) => {
        e.preventDefault();
        const scrollBy = galleryRef.current.clientWidth * index;
        galleryRef.current.scrollLeft = scrollBy;
        setCurrentIndex(index);
        setUnderlinePosition({
            width: e.target.clientWidth,
            offsetLeft: e.target.offsetLeft,
        });
    };

    useEffect(() => {
        const width = menuRef.current.children[0]?.clientWidth;
        const offsetLeft = menuRef.current.children[0]?.offsetLeft;

        setUnderlinePosition({ width, offsetLeft });
    }, []);

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
