const data = [
    {
        title: "Popular",
        description: "These are amenities that guests typically look for in a stay.",
        children: [
            {
                title: "Essentials",
                description: "Towels, bed sheets, soap, toilet paper, and pillows",
                key: "BedroomandLaundry"
            },
            {
                title: "Air conditioning",
                key: "HeatingandCooling"
            },
            {
                title: "Cleaning products",
                key: "Bathroom"
            },
            {
                title: "Cooking basics",
                description: "Pots and pans, oil, salt and pepper",
                key: "KitchenandDining"
            },
            {
                title: "Dedicated workspace",
                description: "Guests have a desk or table that’s used just for working, along with a comfortable chair",
                key: "InternetandOffice"
            },
            {
                title: "Dishes and silverware",
                description: "Bowls, chopsticks, plates, cups, etc.",
                key: "KitchenandDining"
            },
            {
                title: "Dryer",
                key: "BedroomandLaundry"

            },
            {
                title: "Hair dryer",
                key: "Bathroom"
            },
            {
                title: "Heating",
                key: "HeatingandCooling"

            },
            {
                title: "Hot tub",
                key: "ParkingandFacilities"
            },
            {
                title: "Kitchen",
                key: "KitchenandDining"
            },
            {
                title: "Pool",
                key: "ParkingandFacilities"
            },
            {
                title: "TV",
                key: "Entertainment"
            },
            {
                title: "Washing Machine",
                key: "BedroomandLaundry"
            },
            {
                title: "Wifi",
                description: "Available throughout the listing",
                key: "InternetandOffice"
            }
        ]
    },
    {
        title: "Bathroom",
        key: "Bathroom",
        children: [
            {
                title: "Bathtup"
            },
            {
                title: "Body soap"
            },
            {
                title: "Cleaning products",
            },
            {
                title: "Hair dryer"
            },
            {
                title: "Hot water"
            },
            {
                title: "Outdoor shower"
            },
            {
                title: "Shampoo"
            },
            {
                title: "Shower gel"
            },
        ]
    },
    {
        title: "Bedroom and laundry",
        key: "BedroomandLaundry",
        children: [
            {
                title: "Essentials",
                description: "Towels, bed sheets, soap, toilet paper, and pillows"
            },
            {
                title: "Clothing storage",
            },
            {
                title: "Dryer",
            },
            {
                title: "Extra pillows and blankets",
            },
            {
                title: "Hangers",
            },
            {
                title: "Iron",
            },
            {
                title: "Washing Machine",
            },

        ]
    },
    {
        title: "Entertainment",
        key: "Entertainment",
        children: [
            {
                title: "Books and reading material"
            },
            {
                title: "Exercise equipment"
            },
            {
                title: "Piano"
            },
            {
                title: "Pool table"
            },
            {
                title: "Sound system"
            },
            {
                title: "TV"
            }
        ]
    },
    {
        title: "Heating and cooling",
        key: "HeatingandCooling",
        children: [
            {
                title: "Air conditioning"
            },
            {
                title: "Ceiling fan"
            },
            {
                title: "Heating"
            },
            {
                title: "Indoor fireplace"
            }
        ]
    },
    {
        title: "Home safety",
        key: "HomeSafety",
        children: [
            {
                title: "Carbon monoxide alarm",
                description: "Check your local laws, which may require a working carbon monoxide detector in every room"
            },
            {
                title: "Fire extinguisher"
            },
            {
                title: "First aid kit"
            },
            {
                title: "Smoke alarm",
                description: "Check your local laws, which may require a working smoke detector in every room"
            }
        ]
    },
    {
        title: "Internet and office",
        key: "InternetandOffice",
        children: [
            {
                title: "Dedicated workspace",
                description: "Guests have a desk or table that’s used just for working, along with a comfortable chair"
            },
            {
                title: "Pocket wifi"
            },
            {
                title: "Wifi",
                description: "Available throughout the listing"
            }
        ]
    },
    {
        title: "Kitchen and dining",
        key: "KitchenandDining",
        children: [
            {
                title: "Baking sheet"
            },
            {
                title: "Barbecue utensils",
                description: "Grill, charcoal, bamboo skewers/iron skewers, etc."
            },
            {
                title: "Cooking basics",
                description: "Pots and pans, oil, salt and pepper"
            },
            {
                title: "Dining table"
            },
            {
                title: "Dishes and silverware",
                description: "Bowls, chopsticks, plates, cups, etc."
            },
            {
                title: "Dishwasher"
            },
            {
                title: "Kitchen",
                description: "Space where guests can cook their own meals"
            },
            {
                title: "Kitchenette",
                description: "Space where guests can heat up and refrigerate food"
            },
            {
                title: "Microwave",
            },
            {
                title: "Mini fridge"
            },
            {
                title: "Refrigerator"
            },
            {
                title: "Rice maker"
            }
        ]
    },
    {
        title: "Location features",
        key: "LocationFeatures",
        children: [
            {
                title: "Beach access",
                description: "Guests can enjoy a nearby beach"
            },
            {
                title: "Lake access",
                description: "Guests can get to a lake using a path or dock"
            },
            {
                title: "Laundromat nearby",
            },
            {
                title: "Ski-in/Ski-out",
                description: "Guests can access ski lifts without driving or taking paid transportation"
            },
            {
                title: "Waterfront",
                description: "Right next to a body of wate"
            }
        ]
    },
    {
        title: "Outdoor",
        key: "Outdoor",
        children: [
            {
                title: "BBQ grill"
            },
            {
                title: "Beach essentials",
                description: "Beach towels, umbrella, beach blanket, snorkeling gear"
            },
            {
                title: "Bikes"
            },
            {
                title: "Outdoor dining area"
            },
            {
                title: "Patio"
            }
        ]
    },
    {
        title: "Parking and facilities",
        key: "ParkingandFacilities",
        children: [
            {
                title: "Elevator",
                description: "The home or building has an elevator that’s at least 52 inches deep and a doorway at least 32 inches wide."
            },
            {
                title: "EV charger",
                description: "Guests can charge their electric vehicles on the property"
            },
            {
                title: "Free parking on premises"
            },
            {
                title: "Free street parking"
            },
            {
                title: "Exercise equipment"
            },
            {
                title: "Hot tub"
            },
            {
                title: "Paid parking off premises"
            },
            {
                title: "Paid parking on premises"
            },
            {
                title: "Pool"
            },
            {
                title: "Single level home",
                description: "No stairs in home"
            }
        ]
    },
    {
        title: "Services",
        key: "Services",
        children: [
            {
                title: "Breakfast",
                description: "Breakfast is provided"
            },
            {
                title: "Cleaning available during stay",
            }
        ]
    }
]

export default data