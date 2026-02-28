const mongoose = require('mongoose');
const Product = require('../data/models/product');

mongoose.connect('mongodb://localhost:27017/ecomshop')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.log("Error connecting to MongoDB", err);
    });

const sampleProducts = [
    {
        title: "Zenith Pro Laptop",
        description: "Experience ultimate performance with the Zenith Pro. Featuring a 4K display, 32GB RAM, and a lightning-fast SSD.",
        price: 1499.99,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "SonicWave Wireless Headphones",
        description: "Immerse yourself in crystal-clear sound with active noise cancellation and 40 hours of battery life.",
        price: 199.50,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Nexus 7 Smartwatch",
        description: "Stay connected and track your fitness with the Nexus 7. Featuring a sleek AMOLED display and heart rate monitoring.",
        price: 249.00,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "UltraGlass 27-inch Monitor",
        description: "Boost your productivity with a stunning 4K IPS display and ultra-thin bezels for a seamless setup.",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "KeyMaster Mechanical Keyboard",
        description: "Elevate your typing experience with tactile mechanical switches and customizable RGB lighting.",
        price: 129.00,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "SwiftTrack Gaming Mouse",
        description: "Achieve precision gaming with a 25,000 DPI sensor and programmable buttons for competitive play.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "AuraPod Wireless Earbuds",
        description: "Compact design with big sound. Experience true wireless freedom and a comfortable fit for all-day wear.",
        price: 159.00,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Vantage DSLR Camera",
        description: "Capture life's moments in stunning detail with a 24.2MP sensor and 4K video recording capabilities.",
        price: 899.00,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "SkyDRONE X4",
        description: "Take to the skies with an 4K HDR camera, 3-axis gimbal, and 30-minute flight time for breathtaking shots.",
        price: 599.00,
        image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "PowerBase Charging Station",
        description: "Clean up your desk with a 4-in-1 wireless charging station for your phone, watch, and earbuds.",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Titan External SSD (1TB)",
        description: "Rugged design meets blistering speed. Protect your data with military-grade durability and fast transfers.",
        price: 149.00,
        image: "https://images.unsplash.com/photo-1597872200370-499de4f4a07e?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "Lumina SMART LED Bulb",
        description: "Transform your home with millions of colors and smart control via voice or app integration.",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1550524514-925343d6cf9c?auto=format&fit=crop&q=80&w=800"
    }
];

const seedDB = async () => {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Database seeded successfully!");
};

seedDB().then(() => {
    mongoose.connection.close();
});
