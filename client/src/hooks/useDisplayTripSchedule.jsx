import { useEffect, useState } from "react";


const useDisplayTripSchedule = () => {
    const [position, setPosition] = useState(false)
    //to handle shadow of header
    useEffect(() => {
        function handleScroll() {
            console.log(window.scrollY)
            if (window.scrollY > 8) {
                setPosition("sticky")
            } else {
                setPosition("none");
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return position
}

export default useDisplayTripSchedule