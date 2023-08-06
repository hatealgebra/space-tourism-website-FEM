import PageTemplate from '@templates/page.template';
import clsx from 'clsx';
import * as styles from './crewPage.module.css';
import * as sharedStyles from '@styles/sharedStyles.module.css';
import useCarousel from '@hooks/useCarousel';

type TImages = { png: string; webp: string };

interface CrewPageProps {
    crewData: Array<{
        name: string;
        images: TImages;
        role: string;
        bio: string;
    }>;
}

const CrewPage = ({ crewData }: CrewPageProps) => {
    const {
        position,
        currentData,
        carouselGalleryRef,
        onScroll,
        onClickMenuButton,
    } = useCarousel({
        data: crewData,
    });

    return (
        <PageTemplate
            styles={styles}
            headingNumber="02"
            headingText="Meet your crew"
        >
            <div className={styles.contentContainer}>
                <div className={styles.crewCarousel}>
                    <div
                        onScroll={(e) => onScroll(e)}
                        ref={carouselGalleryRef}
                        className={clsx(
                            sharedStyles.carouselGallery,
                            styles.crewGallery
                        )}
                    >
                        {crewData.map((member) => (
                            <img
                                key={`${member.name}-landscape`}
                                src={member.images.webp}
                                alt={`${member.name} landscape`}
                            />
                        ))}
                    </div>
                </div>
                <menu className={styles.dotMenu}>
                    {crewData.map((member, index) => (
                        <button
                            key={`${member.name}-dot`}
                            onClick={() =>
                                onClickMenuButton(carouselGalleryRef, index)
                            }
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
            </div>
        </PageTemplate>
    );
};

export default CrewPage;
