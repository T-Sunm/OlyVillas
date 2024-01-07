import { useControl, Marker } from "react-map-gl";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";
import { useDispatch } from "react-redux";
import { setLocation, setMapData } from "../../store/slices/ProcessSlice";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'


/* eslint-disable complexity,max-statements */
export default function GeocoderControl() {
  const dispatch = useDispatch()

  const ctrl = new MapboxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    marker: false,
    collapsed: true
  })
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    const coords = e?.result;
    console.log(coords)
    const longlat = coords?.geometry?.coordinates
    console.log(longlat)
    const data = {
      landmark: coords?.text ? coords?.text : "",
      neighborhood: coords?.neighborhood ? coords?.neighborhood : "",
      postcode: coords?.postcode ? coords.postcode : "",
      locality: coords?.locality ? coords.locality : "",
      place: coords?.place ? coords.place : "",
      district: coords?.properties?.address ? coords?.properties?.address : "",
      region: coords?.region ? coords?.region : "",
      country: coords?.country ? coords?.country : "",
      street_address: coords?.properties?.address ? coords?.properties?.address : "",
      address_extra: ""
    }
    console.log(coords)
    coords?.context.map((item) => {
      Object.keys(data)?.forEach((key) => {
        if (item?.id?.startsWith(key + ".")) {
          data[key] = item?.text
        }
      })
    })
    console.log(data)
    dispatch(setLocation({ lng: longlat[0], lat: longlat[1] }))
    dispatch(setMapData({ ...data }))
  })
  return null
}



