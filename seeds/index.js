const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Connected to DB");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6700a075f24ef8f3c51e8297',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipisicing elit. Illum eos sequi esse aut sint minus maiores, voluptatem veniam dolor ipsum vitae. Quae at saepe sint placeat asperiores, sunt deserunt repellendus!',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmhlqkna0/image/upload/v1728172112/YelpCamp/vito9k3nnyc0f6o9fetk.jpg',
                    filename: 'YelpCamp/vito9k3nnyc0f6o9fetk',
                  },
                  {
                    url: 'https://res.cloudinary.com/dmhlqkna0/image/upload/v1728172113/YelpCamp/bhyfvlsgeyteu8plser6.png',
                    filename: 'YelpCamp/bhyfvlsgeyteu8plser6',
                  }
            ],
        })
        await camp.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close();
});

//image: `https://picsum.photos/400?random=${Math.random()}`,