import PoolTable from "../svg/ameneties/PoolTable";
import Ac from "../svg/ameneties/ac";
import Bbq from "../svg/ameneties/bbq";
import Beach from "../svg/ameneties/beach";
import CarbonMonoxideAlarm from "../svg/ameneties/carbon-monoxide-alarm";
import FireExt from "../svg/ameneties/fire-ext";
import FirePit from "../svg/ameneties/fire-pit";
import FirstAid from "../svg/ameneties/first-aid";
import Gym from "../svg/ameneties/gym";
import HotTub from "../svg/ameneties/hot-tub";
import IndoorFirplace from "../svg/ameneties/indoor-firplace";
import Kitchen from "../svg/ameneties/kitchen";
import Lake from "../svg/ameneties/lake";
import OutdoorDining from "../svg/ameneties/outdoor-dining";
import OutdoorShower from "../svg/ameneties/outdoor-shower";
import PaidParking from "../svg/ameneties/paid-parking";
import Parking from "../svg/ameneties/parking";
import Patio from "../svg/ameneties/patio";
import Piano from "../svg/ameneties/piano";
import Pool from "../svg/ameneties/pool";

import Ski from "../svg/ameneties/ski";
import SmokeAlarm from "../svg/ameneties/smoke-alarm";
import Tv from "../svg/ameneties/tv";
import WashingMachine from "../svg/ameneties/washing-machine";
import Wifi from "../svg/ameneties/wifi";
import Workplace from "../svg/ameneties/workplace";

export const AmenetiesType = [
  {
    type: "basic",
    data: [
      { name: "Wifi", svgPath: <Wifi />, group: "InternetandOffice" },
      { name: "TV", svgPath: <Tv />, group: "Entertainment" },
      { name: "Kitchen", svgPath: <Kitchen />, group: "KitchenandDining" },
      { name: "Washing Machine", svgPath: <WashingMachine />, group: "BedroomandLaundry" },
      { name: "Free parking on premises", svgPath: <Parking />, group: "ParkingandFacilities" },
      { name: "Paid parking on premises", svgPath: <PaidParking />, group: "ParkingandFacilities" },
      { name: "Air conditioning", svgPath: <Ac />, group: "HeatingandCooling" },
      { name: "Dedicated workplace", svgPath: <Workplace />, group: "InternetandOffice" },
    ],
  },
  {
    type: "advanced",
    data: [
      { name: "Pool", svgPath: <Pool />, group: "ParkingandFacilities" },
      { name: "Hot tub", svgPath: <HotTub />, group: "ParkingandFacilities" },
      { name: "Patio", svgPath: <Patio />, group: "Outdoor" },
      { name: "BBQ grill", svgPath: <Bbq />, group: "Outdoor" },
      { name: "Outdoor dining area", svgPath: <OutdoorDining />, group: "Outdoor" },
      { name: "Fire pit", svgPath: <FirePit />, group: "Outdoor" },
      { name: "Pool table", svgPath: <PoolTable />, group: "Entertainment" },
      { name: "Indoor fireplace", svgPath: <IndoorFirplace />, group: "HeatingandCooling" },
      { name: "Piano", svgPath: <Piano />, group: "Entertainment" },
      { name: "Exercise equipment", svgPath: <Gym />, group: "ParkingandFacilities" },
      { name: "Lake access", svgPath: <Lake />, group: "LocationFeatures" },
      { name: "Beach access", svgPath: <Beach />, group: "LocationFeatures" },
      { name: "Ski-in/Ski-out", svgPath: <Ski />, group: "LocationFeatures" },
      { name: "Outdoor shower", svgPath: <OutdoorShower />, group: "Bathroom" },
    ],
  },
  {
    type: "safety",
    data: [
      { name: "Smoke alarm", svgPath: <SmokeAlarm />, group: "HomeSafety" },
      { name: "First aid kit", svgPath: <FirstAid />, group: "HomeSafety" },
      { name: "Fire extinguisher", svgPath: <FireExt />, group: "HomeSafety" },
      { name: "Carbon monoxide alarm", svgPath: <CarbonMonoxideAlarm />, group: "HomeSafety" },
    ],
  },
];
