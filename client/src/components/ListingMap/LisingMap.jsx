import React, { useMemo } from 'react'
import Map, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
const LisingMap = ({ mapLocation, mapData }) => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    const pins = useMemo(() => {

        return (
            <Marker
                longitude={mapLocation.lng}
                latitude={mapLocation.lat}
            />
        )
    }, [mapLocation])

    return (
        <div className='h-96 w-full '>
            <div className='mb-[24px]'>
                <div className='pb-[24px]'>
                    <span className='text-[22px] font-semibold '>
                        Where you’ll be
                    </span>
                </div>
                <span>
                    {mapData?.locality + ", " + mapData?.place + ", " + mapData?.region + ", " + mapData?.country}
                </span>
            </div>
            <Map initialViewState={{
                longitude: mapLocation.lng,
                latitude: mapLocation.lat,
                zoom: 13
            }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={mapboxToken}>
                {pins}
            </Map>
        </div>
    )
}

export default LisingMap