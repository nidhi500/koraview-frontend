// src/data/monasteries.js
// Demo dataset for Featured Monasteries. Replace asset URLs with your real assets in public/assets/.

const MONASTERIES = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    location: { lat: 27.3309, lng: 88.5182 },
    // panoramic: inside and outside panoramas (can be hosted or local file under public/assets/panoramas)
    panoramas: {
      inside: "/assets/panoramas/rumtek_inside_360.html",   // if using marzipano viewer page or iframe image
      outside: "/assets/panoramas/rumtek_outside_360.html"
    },
    thumbnail: "/assets/images/rumtek.jpg",
    audio: {
      hindi: "/assets/audio/rumtek_hi.mp3",
      nepali: "/assets/audio/rumtek_np.mp3",
      english: "/assets/audio/rumtek_en.mp3"
    },
    archives: [
      { id: "r-a1", title: "17th century palm-leaf manuscript (sample)", image: "/assets/archives/rumtek_manuscript.jpg" }
    ],
    description:
      "Rumtek, near Gangtok, is the seat-in-exile of the Karmapa and an important centre for the Karma Kagyu school. The present monastery was rebuilt in the 1960s and is noted for its large assembly hall, painted murals and active monastic community."
  },

  {
    id: "tashiding",
    name: "Tashiding Monastery",
    location: { lat: 27.3144, lng: 88.2743 },
    panoramas: {
      inside: "/assets/panoramas/tashiding_inside_360.html",
      outside: "/assets/panoramas/tashiding_outside_360.html"
    },
    thumbnail: "/assets/images/tashiding.jpg",
    audio: {
      hindi: "/assets/audio/tashiding_hi.mp3",
      nepali: "/assets/audio/tashiding_np.mp3",
      english: "/assets/audio/tashiding_en.mp3"
    },
    archives: [
      { id: "t-a1", title: "Palm-leaf manuscript (scan) - sample", image: "/assets/archives/tashiding_manuscript.jpg" }
    ],
    description:
      "Tashiding is perched on a ridge overlooking the Rathong river. An important pilgrimage site, its name means 'The Devoted Central Glory' and it is celebrated for its ritual ceremonies and tranquil hilltop setting."
  },

  {
    id: "enchey",
    name: "Enchey Monastery",
    location: { lat: 27.3440, lng: 88.6164 },
    panoramas: {
      inside: "/assets/panoramas/enchey_inside_360.html",
      outside: "/assets/panoramas/enchey_outside_360.html"
    },
    thumbnail: "/assets/images/enchey.jpg",
    audio: {
      hindi: "/assets/audio/enchey_hi.mp3",
      nepali: "/assets/audio/enchey_np.mp3",
      english: "/assets/audio/enchey_en.mp3"
    },
    archives: [
      { id: "e-a1", title: "Local mural scan (sample)", image: "/assets/archives/enchey_mural.jpg" }
    ],
    description:
      "Enchey Monastery in Gangtok dates back to the 19th century and is known for its colorful cham dances and murals. It is one of the oldest monasteries in the area and an important local spiritual centre."
  }
];

export default MONASTERIES;
