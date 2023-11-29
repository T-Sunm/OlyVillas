import { useControl, Marker } from "react-map-gl";
import MapboxGeocoder, { GeocoderOptions } from "@mapbox/mapbox-gl-geocoder";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { setPreLocationData, setPreMapData } from "../../../store/slices/EditPropSlice";
import { useDispatch } from "react-redux";


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
      landmark: coords?.text,
      neighborhood: coords.neighborhood,
      postcode: coords.postcode,
      locality: coords.locality,
      place: coords.place,
      district: coords.district,
      region: coords.region,
      country: coords.country,
      street_address: "",
      address_extra: ""
    }
    coords?.context.map((item) => {
      Object.keys(data)?.forEach((key) => {
        if (item?.id?.startsWith(key + ".")) {
          data[key] = item?.text
        }
      })
    })
    dispatch(setPreLocationData({ lng: longlat[0], lat: longlat[1] }))
    dispatch(setPreMapData({ ...data }))
  })
  return null
}



