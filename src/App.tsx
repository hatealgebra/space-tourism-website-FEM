import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from '@routes/Root';
import CrewPage from '@routes/crewPage/CrewPage';

import './global.css';

import dataJSON from '@static/data.json';
import DestinationPage from '@routes/destinationPage/DestinationPage';
import TechnologyPage from '@routes/technologyPage/TechnologyPage';

const App = () => {
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
            element: <DestinationPage />,
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
            <footer>
                Challenge by
                <a
                    href="https://www.frontendmentor.io?ref=challenge"
                    target="_blank"
                >
                    Frontend Mentor
                </a>
                . Coded by <a href="https://github.com/hatealgebra">Paul</a>.
            </footer>
        </>
    );
};

export default App;
