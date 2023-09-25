import {  useEffect, useState } from 'react';

interface UseCarouselProps {
    data: Array<ICrewData> | Array<ITechnologyData>;
    carouselGalleryRef: React.MutableRefObject<null | HTMLDivElement>;
    hasVerticalScroll?: boolean;
}

const useCarousel = ({ carouselGalleryRef,data }: UseCarouselProps) => {
    const [position, setPosition] = useState(0);
    const [currentData, setCurrentData] = useState(data[position]);


    const onClickMenuButton = (index: number) => {
        if(!carouselGalleryRef.current) return;

        const chosenElement = carouselGalleryRef.current.children[index];
        chosenElement.scrollIntoView({ behavior: 'smooth' });
        setPosition(index);
        setCurrentData(data[index]);    
    }

    useEffect(() => {
        if(!carouselGalleryRef.current) return 
        setPosition(0);

    }, [data])

    return {
        position,
        currentData,
        onClickMenuButton,
    };
};

export default useCarousel;
