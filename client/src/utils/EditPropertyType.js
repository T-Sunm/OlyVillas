export const places = [
    {
        id: 1,
        name: "Apartment"
    },
    {
        id: 2,
        name: "House"
    },
    {
        id: 3,
        name: "Secondary unit"
    },
    {
        id: 4,
        name: "Unique space"
    },
    {
        id: 5,
        name: "Boutique hotel"
    }
]

export const PropertyType = [
    {
        id:1,
        parentId: 1,
        name: "Rental unit"
    },
    {
        id:2,
        parentId: 1,
        name: "Condo"
    },
    {
        id:3,
        parentId: 1,
        name: "Serviced apartment"
    },
    {
        id:4,
        parentId: 1,
        name: "Loft"
    },
    {
        id:5,
        parentId: 1,
        name: "Bed and breakfast"
    }
    ,
    {
        id:6,
        parentId: 2,
        name: "Home"
    },
    {
        id:7,
        parentId: 2,
        name: "Cabin"
    },
    {
        id:8,
        parentId: 2,
        name: "Trullo"
    },
    {
        id:9,
        parentId: 2,
        name: "Earth home"
    },
    {
        id:10,
        parentId: 2,
        name: "Tiny home"
    },
    {
        id:11,
        parentId: 3,
        name: "Guest house",
        description : 'A separate building from the main house.'
    },
    {
        id:12,
        parentId: 4,
        name: "Cave",
        description : 'A natural or carved dwelling on a hillside or cliff.'
    },
        {
        id:13,
        parentId: 4,
        name: "Container",
        description : ''
    },
    {
        id:14,
        parentId: 4,
        name: "Cycladic home",
        description : ''
    },
    {
        id:15,
        parentId: 4,
        name: "Island",
        description : 'A piece of land surrounded by water.'
    },
    {
        id:16,
        parentId: 4,
        name: "Yurt",
        description : ''
    },
    {
        id:17,
        parentId: 4,
        name: "Windmill",
        description : ''
    },
    {
        id:18,
        parentId: 4,
        name: "Tiny home"
    },
    {
        id:19,
        parentId: 4,
        name: "Camper/RV"
    },
    {
        id:20,
        parentId: 4,
        name: "Casa particular"
    },
     {
        id:21,
        parentId: 4,
        name: "Castle"
    },
    {
        id:22,
        parentId: 4,
        name: "Dammuso"
    },
    {
        id:23,
        parentId: 4,
        name: "Dome"
    },
    {
        id:24,
        parentId: 4,
        name: "Earth home"
    },
    {
        id:25,
        parentId: 4,
        name: "Farm"
    },
    {
        id:26,
        parentId: 4,
        name: "Kezhan"
    },
    {
        id:27,
        parentId: 4,
        name: "Minsu"
    },
    {
        id:28,
        parentId: 4,
        name: "Riad"
    },
    {
        id:29,
        parentId: 4,
        name: "Ryokan"
    },
    {
        id:30,
        parentId: 4,
        name: "Shepherd's hut"
    },
    {
        id:31,
        parentId: 4,
        name: "Tent"
    },
    {
        id:32,
        parentId: 4,
        name: "Houseboat"
    },
    {
        id:33,
        parentId: 4,
        name: "Barn"
    },
        {
        id:34,
        parentId: 4,
        name: "Boat"
    },
    {
        id:35,
        parentId: 4,
        name: "Treehouse",
        description : 'A dwelling built into the trunk or branches of a tree, or sitting on stilts among trees.'
    },
    {
        id:36,
        parentId: 4,
        name: "Tower",
        description : ''
    },
        {
        id:37,
        parentId: 4,
        name: "Tower",
        description : ''
    },
    {
        id:38,
        parentId: 4,
        name: "Campsite",
        description : 'An area of land where guests can set up a tent, yurt, RV, or tiny house.'
    },
    {
        id:39,
        parentId: 5,
        name: "Hostel",
        description : 'A hospitality business that rents beds in shared dorms and private rooms.'
    },
    {
        id:40,
        parentId: 5,
        name: "Hotel",
        description : 'A business offering private rooms, suites, or unique stays for guests.'
    },
    {
        id:41,
        parentId: 5,
        name: "Resort",
        description : 'A hospitality business with more amenities and services than a hotel.'
    }
]

export const ListingType = [
    {
        id:1,
        parentId: [1,2,3,4],
        name: "An entire place",
        description:"Guests have the whole place to themselves. This usually includes a bedroom, a bathroom, and a kitchen.",
        data:"Entire"
    },
    {
        id:2,
        parentId: [1,2,3,4,5],
        name: "Room",
        description:"Guests have their own room for sleeping. Other areas can be shared. Rooms are reviewed by Airbnb to see if they fit this criteria.",
        data:"Private room"
    },
    {
        id:3,
        parentId: [1,2,3,4,5],
        name:"Shared room",
        description: "Guests sleep in a bedroom or a common area that could be shared with others.",
        data:"Room"
    }
]