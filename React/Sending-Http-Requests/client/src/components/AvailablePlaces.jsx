import { useEffect, useState } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {
    const [isFetching, setIsFetching] = useState(false);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        setIsFetching(true);

        fetch('http://localhost:3000/places')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch places!');
                }

                return response.json();
            })
            .then((resData) => {
                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(
                        resData.places,
                        position.coords.latitude,
                        position.coords.longitude
                    );

                    setAvailablePlaces(sortedPlaces);
                    setIsFetching(false);
                });
            })
            .catch((error) => {
                setError({
                    message:
                        error.message ||
                        'Could not fetch places, please try again later!',
                });
                setIsFetching(false);
            });
    }, []);

    if (error) {
        return <Error title={'An error occurred!'} message={error.message} />;
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText="Fetching place data..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
