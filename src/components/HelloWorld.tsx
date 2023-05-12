import { useEffect, useState } from "react";

export const HelloWorld = (props : HelloWorldProps) => {
    const [counter, setCounter] = useState(0);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.debug("Install setInterval");
        const id = setInterval(() => { setDate(new Date()); }, 1000);
        return () => { clearInterval(id); console.debug("Clear setInterval"); };
    }, []);

    useEffect(() => { props.onCounterChange(counter); }, [counter]);


    return (
        <div>
            <div className="top">
            <p>Hello World {props.name}</p>
            <p> Vous avez cliqué {counter} fois sur l'image.</p>
            <p>Il est {date.toLocaleTimeString()}</p>
            </div>
            <img className="bg" src="planisphere.png" width="100%" onClick={() => setCounter(counter + 1)} />

        </div>
    );
}

export interface HelloWorldProps{
    name : string;
    onCounterChange: (clicks: number) => void;
}