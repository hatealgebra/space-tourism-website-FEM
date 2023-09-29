import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import * as styles from './technologyCarousel.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';
import useCarousel from '@hooks/useCarousel';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINTS } from '@constants/constants';

import data from '@static/data.json';

const TechnologyPage = () => {
    const [gridDirection, setGridDirection] = useState({
        gridTemplateColumns: `repeat(${data.technology.length}, 100%)`,
    });
    const windowWidth = useWindowSize();
    const carouselGalleryRef = useRef(null);

    const { position, currentData, onClickMenuButton, onScroll } = useCarousel({
        carouselGalleryRef,
        data: data.technology,
        hasVerticalScroll: true,
    });

    useEffect(() => {
        if (windowWidth > BREAKPOINTS.desktop) {
            return setGridDirection({
                gridTemplateRows: `repeat(${data.technology.length}, 100%)`,
            });
        }
        return setGridDirection({
            gridTemplateColumns: `repeat(${data.technology.length}, 100%)`,
        });
    }, [windowWidth]);

    return (
        <>
            <div className={styles.technologyCarousel}>
                <div
                    onScroll={(e) =>
                        onScroll(e, windowWidth > BREAKPOINTS.desktop)
                    }
                    className={clsx(
                        sharedStyles.carouselGallery,
                        styles.technologyGallery
                    )}
                    role="list"
                    ref={carouselGalleryRef}
                    style={gridDirection}
                >
                    {data.technology.map(({ images, name }) => {
                        const orientation =
                            windowWidth > BREAKPOINTS.desktop
                                ? 'portrait'
                                : 'landscape';
                        const imageUrl = new URL(
                            images[orientation],
                            import.meta.url
                        );

                        return (
                            <img
                                role="listitem"
                                key={`${name}-technology-image`}
                                src={imageUrl.toString()}
                            />
                        );
                    })}
                </div>
            </div>
            <menu className={styles.menuControls}>
                {data.technology.map((_, index) => (
                    <button
                        key={`${index}-technology-button`}
                        onClick={() => onClickMenuButton(index)}
                        className={clsx(index === position && styles.active)}
                    >
                        {index + 1}
                    </button>
                ))}
            </menu>
            <section className={styles.textContent}>
                <span className={sharedStyles.subTwo}>The Terminology ...</span>
                <h3>{currentData.name}</h3>
                <p>{currentData.description}</p>
            </section>
        </>
    );
};

export default TechnologyPage;
