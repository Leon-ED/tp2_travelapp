import { createContext, useContext, useMemo } from "react";
import { TownDisplayer, Towns } from "./Town";
import { HomeTownContext } from "./EnhancedTownListDisplayer";



export const TownWithDistanceDisplayer = (props: { town: Towns }) => {
    const homeTown = useContext(HomeTownContext);

    const distance = useMemo(
        () =>
            getDistanceFromLatLonInKm(
                props.town.latitude,
                props.town.longitude,
                homeTown?.latitude || 0,
                homeTown?.longitude || 0
            ),
        [props.town.latitude, props.town.longitude, homeTown]
    );

    return (
        <div className="town">
            <TownDisplayer {...props.town} />
            <p>Distance: {distance} km</p>

        </div>
    );
};



export const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    var R: number = 6371; // Rayon de la terre en km
    var dLat: number = deg2rad(lat2 - lat1);  // deg2rad ci-dessous
    var dLon: number = deg2rad(lon2 - lon1);
    var a: number =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c; // Distance en km
    return Math.round(d * 100) / 100;
}

export const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180)
}