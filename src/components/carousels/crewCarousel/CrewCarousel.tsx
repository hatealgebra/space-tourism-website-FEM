import { useRef } from 'react';
import clsx from 'clsx';
import * as styles from './crewCarousel.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';
import useCarousel from '@hooks/useCarousel';

import data from '@static/data.json';

type TImages = { png: string; webp: string };

type TCrewData = Array<{
    name: string;
    images: TImages;
    role: string;
    bio: string;
}>;

const CrewPage = () => {
    const carouselGalleryRef = useRef(null);

    const { position, currentData, onClickMenuButton, onScroll } = useCarousel({
        carouselGalleryRef,
        data: data.crew,
    });

    return (
        <>
            <div className={styles.crewCarousel}>
                <div
                    onScroll={(e) => onScroll(e)}
                    ref={carouselGalleryRef}
                    className={clsx(
                        sharedStyles.carouselGallery,
                        styles.crewGallery
                    )}
                    style={{
                        gridTemplateColumns: `repeat(${data.crew.length}, 100%)`,
                    }}
                >
                    {data.crew.map((member) => (
                        <img
                            key={`${member.name}-landscape`}
                            src={member.images.webp}
                            alt={`${member.name} landscape`}
                        />
                    ))}
                </div>
            </div>
            <menu className={styles.dotMenu}>
                {data.crew.map((member, index) => (
                    <button
                        key={`${member.name}-dot`}
                        onClick={(e) => {
                            e.preventDefault();
                            onClickMenuButton(index);
                        }}
                        className={clsx(
                            index === position && styles.active,
                            index > 1 && styles.square
                        )}
                    />
                ))}
            </menu>
            <section className={styles.bio}>
                <h4>{currentData.role}</h4>
                <h3>{currentData.name}</h3>
                <p>{currentData.bio}</p>
            </section>
        </>
    );
};

export default CrewPage;
