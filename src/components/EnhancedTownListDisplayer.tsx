import { useEffect, useState, createContext, useContext, useMemo, MouseEventHandler } from "react";
import { Coordinates, GeoLocation } from "./GeoLocation";
import { TownDisplayer, Towns } from "./Town";
import { TownWithDistanceDisplayer, getDistanceFromLatLonInKm } from "./TownWithDistanceDisplayer";

export interface EnhancedTownListDisplayerProps {
  towns: Towns[];
}

export const HomeTownContext = createContext<Towns | undefined>(undefined);
enum sortType {
  alphabetical = "alphabetical",
  distance = "distance",
}

export const EnhancedTownListDisplayer = (props: EnhancedTownListDisplayerProps) => {
  const [userCoords, setUserCoords] = useState<Coordinates | undefined>(undefined);
  const [townName, setTownName] = useState<string | undefined>(undefined);
  const [sortingType, setSortingType] = useState<sortType>(sortType.alphabetical);





  const myTown: Towns = {
    supporter: "Moi",
    name: townName === undefined ? "Ma ville" : townName,
    latitude: userCoords === undefined ? 0 : userCoords.lat,
    longitude: userCoords === undefined ? 0 : userCoords.lon,
  };

  useMemo(() => { sortTownList(props.towns, sortingType, myTown) }, [sortingType, myTown]);

  const townList = [myTown, ...props.towns].map((town, index) => (
    <TownWithDistanceDisplayer key={index} town={town} />
  ));

  function handleModifiedCoordinates(coord: Coordinates) {
    getTownName(coord).then((townName) => setTownName(townName));
    setUserCoords(coord);
  }

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    setSortingType(event.target.value as sortType);
  }




  return (
    <div>
      <GeoLocation onModifiedCoordinates={handleModifiedCoordinates} />
      <div className="sort-type">
        <label htmlFor="sort-type">Trier par :</label>
        <input type="radio" name="sort-type" id="sort-type" value="alphabetical" onChange={handleChecked} />
        <label htmlFor="sort-type">Alphabétique</label>
        <input type="radio" name="sort-type" id="sort-type" value="distance" onChange={handleChecked} />
        <label htmlFor="sort-type">Distance</label>
      </div>
      <div className="towns-list">
        <HomeTownContext.Provider value={myTown}>
          {townList}
        </HomeTownContext.Provider>
      </div>
    </div>
  );
};



const getTownName = async (coord: Coordinates) => {
  const url: string =
    "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
    coord.lat +
    "&lon=" +
    coord.lon;
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data.address.town);
};




function sortTownList(towns: Towns[], sortBy: sortType, homeTown: Towns) {
  switch (sortBy) {
    case sortType.alphabetical:
      return towns.sort((a, b) => a.name.localeCompare(b.name));
    case sortType.distance:
      return towns.sort((a, b) => getDistanceFromLatLonInKm(a.latitude, a.longitude, homeTown.latitude, homeTown.longitude) - getDistanceFromLatLonInKm(b.latitude, b.longitude, homeTown.latitude, homeTown.longitude));
  }

}

