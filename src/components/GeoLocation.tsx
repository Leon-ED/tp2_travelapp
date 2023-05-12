import { useEffect, useState } from "react";

export interface GeoLocationProps {
    onModifiedCoordinates: (coord: Coordinates) => void;
}
export const GeoLocation = (props: GeoLocationProps) => {
    const [latitude, setLatitude] = useState("0");
    const [longitude, setLongitude] = useState("0");

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (!validateCoordinates({ lat: position.coords.latitude, lon: position.coords.longitude }))
                        return;


                    setLatitude(position.coords.latitude.toString())
                    setLongitude(position.coords.longitude.toString())
                    //   if (props.onModifiedCoordinates) {
                    //     props.onModifiedCoordinates({ lat: position.coords.latitude, lon: position.coords.longitude })
                    //   }
                },
                async (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        try {
                            const coordinates = await fetchJSONData('https://ip-api.com/json/')
                            setLatitude(coordinates.lat.toString())
                            setLongitude(coordinates.lon.toString())

                        } catch (error) {
                            console.error('Failed to retrieve IP-based coordinates:', error)
                        }
                    } else {
                        console.error('Failed to retrieve coordinates:', error)
                    }
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
        }
    }



    useEffect(() => {
        props.onModifiedCoordinates({ lat: parseFloat(latitude), lon: parseFloat(longitude) } as Coordinates);
    }, [latitude, longitude]);


    return (
        <div className="geo-container">
            <h2>Géolocalisation</h2>
            <p>Latitude : {latitude} - Longitude : {longitude}</p>
            <div>
                <div>
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" name="latitude" id="latitude" value={latitude} onChange={(e) => { setLatitude(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" name="longitude" id="longitude" value={longitude} onChange={(e) => { setLatitude(e.target.value) }} />
                </div>
            </div>
            <button onClick={handleGetLocation}>Me localiser</button>
        </div>
    )




}




export type Coordinates = { lat: number, lon: number };
async function fetchJSONData(url: string): Promise<Coordinates> {
    const response = await fetch(url);
    const data = await response.json();
    return data as Coordinates;
}

const validateCoordinates = (coordinates: Coordinates): boolean => {
    return isFinite(coordinates.lat) && isFinite(coordinates.lon) && Math.abs(coordinates.lat) <= 90 && Math.abs(coordinates.lon) <= 180;
}
