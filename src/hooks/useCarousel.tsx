import {  UIEvent, useState } from 'react';

interface UseCarouselProps {
    data: Array<ICrewData> | Array<ITechnologyData>;
    carouselGalleryRef: React.MutableRefObject<null | HTMLDivElement>;
    hasVerticalScroll?: boolean;
}

const useCarousel = ({ carouselGalleryRef,data }: UseCarouselProps) => {
    const [position, setPosition] = useState(0);
    const [currentData, setCurrentData] = useState(data[position]);
    const [isThrottle, setIsThrottle] = useState(false);


    const onClickMenuButton = (index: number) => {
        if(!carouselGalleryRef.current) return;

        const chosenElement = carouselGalleryRef.current.children[index];
        chosenElement.scrollIntoView({ behavior: 'smooth' });
    }

    const onScroll = (e: UIEvent<HTMLDivElement, UIEvent>) => {
        if(isThrottle) return 
        setIsThrottle(true);

        const galleryElement = e.currentTarget;

        const elementWidth = galleryElement.scrollWidth / galleryElement.childElementCount;
        const position = Math.floor(galleryElement.scrollLeft / elementWidth);
        setPosition(position);
        setCurrentData(data[position]);

        setTimeout(() => {
            setIsThrottle(false);
        }, 50);
    }




    return {
        position,
        currentData,
        onClickMenuButton,
        onScroll
    };
};

export default useCarousel;
