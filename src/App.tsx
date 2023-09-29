import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from '@routes/Root';
import CrewPage from '@routes/crewPage/CrewPage';

import './global.css';

import dataJSON from '@static/data.json';
import DestinationPage from '@routes/destinationPage/DestinationPage';
import TechnologyPage from '@routes/technologyPage/TechnologyPage';
import useWindowSize from '@hooks/useWindowSize';
import { BREAKPOINTS } from '@constants/constants';

const App = () => {
    const windowWidth = useWindowSize();

    const {
        destinations: destinationsData,
        crew: crewData,
        technology: technologyData,
    } = dataJSON;

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
        },
        {
            path: '/destinations',
            element: <DestinationPage destinationsData={destinationsData} />,
        },
        {
            path: '/crew',
            element: <CrewPage crewData={crewData} />,
        },
        {
            path: '/technology',
            element: <TechnologyPage technologyData={technologyData} />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
            {windowWidth >= BREAKPOINTS.tablet && (
                <footer>
                    Challenge by
                    <a
                        href="https://www.frontendmentor.io?ref=challenge"
                        target="_blank"
                    >
                        Frontend Mentor
                    </a>
                    . Coded by <a href="https://github.com/hatealgebra">Paul</a>
                    .
                </footer>
            )}
        </>
    );
};

export default App;
