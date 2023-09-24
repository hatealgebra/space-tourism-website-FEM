import { BREAKPOINTS } from '@constants/constants';
import { useEffect, useRef, useState } from 'react';
import useWindowSize from './useWindowSize';

interface UseCarouselProps {
    data: Array<ICrewData> | Array<ITechnologyData>;
    hasVerticalScroll?: boolean;
}

const useCarousel = ({ data, hasVerticalScroll }: UseCarouselProps) => {
    const [position, setPosition] = useState(0);
    const [currentData, setCurrentData] = useState(data[position]);

    const carouselGalleryRef = useRef(null);
    const windowWidth = useWindowSize();

    const enableVerticalScroll =
        windowWidth > BREAKPOINTS.desktop && hasVerticalScroll;

    const clientDimension = enableVerticalScroll
        ? 'clientWidth'
        : 'clientHeight';

    const scrollDirection = enableVerticalScroll ? 'scrollTop' : 'scrollLeft';

    const onScroll = (e) => {
        const scrollBy = e.target[scrollDirection];

        for (let i = 0; i < data.length; i++) {
            const scrollDimension = e.target[clientDimension] * i;
            if (scrollBy >= scrollDimension) {
                setPosition(i);
            }
        }
    };

    const onClickMenuButton = (carouselGalleryRef, index) => {
        const chosenElement = carouselGalleryRef.current.children[index];
        chosenElement.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        setCurrentData(data[position]);
    }, [position]);

    return {
        position,
        currentData,
        carouselGalleryRef,
        onScroll,
        onClickMenuButton,
    };
};

export default useCarousel;
