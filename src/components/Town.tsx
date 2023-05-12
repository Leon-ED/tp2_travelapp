export interface Towns{
    supporter:string;
    name:string;
    latitude:number;
    longitude:number;
}

export const TownDisplayer = (props : Towns) => {
    const wikipediaLink: string = "https://fr.wikipedia.org/wiki/" + props.name;
    const openStreetMapLink: string = "https://www.openstreetmap.org/?mlat=" + props.latitude + "&mlon=" + props.longitude + "&zoom=9#map=9/" + props.latitude + "/" + props.longitude;

return (
<div>
  <a href={wikipediaLink}>{props.name}</a> 
  <a href={openStreetMapLink}>🌎</a>
</div>
)}

export const TownListDisplayer = (props : {towns: Towns[]}) => {
    const towns = props.towns.map((town, index) => (
        <TownDisplayer key={index} {...town} />
    ));
    return (
        <div>
            {towns}
        </div>
    )
}



