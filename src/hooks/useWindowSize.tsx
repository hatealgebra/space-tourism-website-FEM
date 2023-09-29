import { useEffect, useState } from 'react';

const useWindowSize = () => {
    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

    useEffect(() => {

        window.addEventListener('resize', () => {
            setDeviceWidth(window.innerWidth);
        });

        return () => {
            window.removeEventListener('resize', () => {});
        };
    }, []);

    return deviceWidth;
};

export default useWindowSize;
