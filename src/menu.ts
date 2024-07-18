import { Menu } from "./Food";

export const menu: Menu = [
  {
    title: "Offers",
    items: [
      {
        name: "Криспи&Лонг дуэт",
        price: 1860,
        oldPrice: 3100,
        calories: 1,
        image: require("../assets/offer-1.jpeg"),
      },
      {
        name: "Криспи&Воппер дуэт",
        price: 2555,
        oldPrice: 3650,
        calories: 1,
        image: require("../assets/offer-2.jpeg"),
      },
      {
        name: "Воппер&Кольца 8",
        price: 2345,
        oldPrice: 3350,
        calories: 1,
        image: require("../assets/offer-3.jpeg"),
      },
      {
        name: "Криспи Ролл&Кольца 8",
        price: 1625,
        oldPrice: 2500,
        calories: 1,
        image: require("../assets/offer-4.jpeg"),
      },
      {
        name: "Лонг Чикен Яндекс",
        price: 1020,
        oldPrice: 1700,
        calories: 210,
        image: require("../assets/offer-5.jpeg"),
      },
    ],
  },
  {
    title: "Комбо",
    items: [
      {
        name: "Воппер Комбо",
        price: 3300,
        calories: 1,
        image: require("../assets/combo-1.jpeg"),
      },
      {
        name: "Чизбургер комбо",
        price: 1750,
        calories: 1,
        image: require("../assets/combo-2.jpeg"),
      },
      {
        name: "Чиззи Ролл комбо",
        price: 3000,
        calories: 1,
        image: require("../assets/combo-3.jpeg"),
      },
      {
        name: "Криспи Чикен комбо",
        price: 2550,
        calories: 1,
        image: require("../assets/combo-4.jpeg"),
      },
      {
        name: "Лонг Чикен комбо",
        price: 2750,
        calories: 1,
        image: require("../assets/combo-5.jpeg"),
      },
    ],
  },
  {
    title: "Бургеры",
    items: [
      {
        name: "Воппер",
        price: 2250,
        calories: 279,
        image: require("../assets/burger-1.jpeg"),
      },
      {
        name: "Криспи Чикен",
        price: 1400,
        calories: 177,
        image: require("../assets/burger-2.jpeg"),
      },
      {
        name: "Лонг Чикен",
        price: 1700,
        calories: 210,
        image: require("../assets/burger-3.jpeg"),
      },
      {
        name: "Стейкхаус",
        price: 2100,
        calories: 243,
        image: require("../assets/burger-4.jpeg"),
      },
      {
        name: "Чиззи ролл",
        price: 1850,
        calories: 1,
        image: require("../assets/burger-5.jpeg"),
      },
      {
        name: "Двойной Криспи Чикен",
        price: 2300,
        calories: 316,
        image: require("../assets/burger-6.jpeg"),
      },
      {
        name: "Чизбургер",
        price: 650,
        calories: 111,
        image: require("../assets/burger-7.jpeg"),
      },
    ],
  },
  {
    title: "Закуски",
    items: [
      {
        name: "King Фри М(стандартная порция)",
        price: 590,
        calories: 98,
        image: require("../assets/fries-1.jpeg"),
      },
      {
        name: "King Фри L(увеличенная порция)",
        price: 690,
        calories: 140,
        image: require("../assets/fries-1.jpeg"),
      },
      {
        name: "Роял фри сырный",
        price: 1050,
        calories: 239,
        image: require("../assets/fries-1.jpeg"),
      },
      {
        name: "Роял фри сырный и bbq",
        price: 1050,
        calories: 256,
        image: require("../assets/fries-1.jpeg"),
      },
    ],
  },
  {
    title: "Напитки",
    items: [
      {
        name: "Fuse tea",
        price: 500,
        calories: 1,
        image: require("../assets/drink-1.jpeg"),
      },
      {
        name: "Сок Piko (200 мл)",
        price: 400,
        calories: 1,
        image: require("../assets/drink-2.jpeg"),
      },
      {
        name: "Вода BonAqua (500 мл)",
        price: 400,
        calories: 1,
        image: require("../assets/drink-3.jpeg"),
      },
      {
        name: "Coca Cola (500 мл)",
        price: 450,
        calories: 1,
        image: require("../assets/drink-4.png"),
      },
      {
        name: "Sprite (500 мл)",
        price: 450,
        calories: 1,
        image: require("../assets/drink-4.png"),
      },
      {
        name: "Fanta (500 мл)",
        price: 450,
        calories: 1,
        image: require("../assets/drink-4.png"),
      },
    ],
  },
  {
    title: "Соусы",
    items: [
      {
        name: "Сырный соус Heinz",
        price: 150,
        calories: 1,
        image: require("../assets/sauce-1.jpeg"),
      },
      {
        name: "Соус барбекю Heinz",
        price: 150,
        calories: 1,
        image: require("../assets/sauce-2.jpeg"),
      },
      {
        name: "Кетчуп Heinz",
        price: 150,
        calories: 1,
        image: require("../assets/sauce-3.jpeg"),
      },
    ],
  },
  {
    title: "Прочее",
    items: [
      {
        name: "Пакет",
        price: 70,
        calories: 1,
        image: require("../assets/other-1.jpeg"),
      },
      {
        name: "Влажная салфетка",
        price: 50,
        calories: 1,
        image: require("../assets/other-2.jpeg"),
      },
    ],
  },
];

const headerImage = require("../assets/cover.jpg");

export const images = [
  headerImage,
  ...menu
    .map((food) => food.items)
    .flat()
    .map(({ image }) => image),
];
