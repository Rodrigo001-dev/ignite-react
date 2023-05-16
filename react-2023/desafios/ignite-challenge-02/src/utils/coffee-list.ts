import { v4 as uuidV4 } from "uuid";

export interface CoffeeItemType {
  id: string;
  name: string;
  description: string;
  image_url: string;
  tags: string[];
  price: number;
}

export const Coffees: CoffeeItemType[] = [
  {
    id: uuidV4(),
    name: "Expresso Tradicional",
    description: "O tradicional café feito com água quente e grãos moídos",
    tags: ["TRADICIONAL"],
    image_url: "../assets/express.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Expresso Americano",
    description: "Expresso diluído, menos intenso que o tradicional",
    tags: ["TRADICIONAL"],
    image_url: "../assets/american.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Expresso Cremoso",
    description: "Café expresso tradicional com espuma cremosa",
    tags: ["TRADICIONAL"],
    image_url: "../assets/creamy-espresso.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Expresso Gelado",
    description: "Bebida preparada com café expresso e cubos de gelo",
    tags: ["TRADICIONAL", "GELADO"],
    image_url: "../assets/iced-coffee.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Café com Leite",
    description: "Meio a meio de expresso tradicional com leite vaporizado",
    tags: ["TRADICIONAL", "COM LEITE"],
    image_url: "../assets/coffee-with-milk.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Latte",
    description:
      "Uma dose de café expresso com o dobro de leite e espuma cremosa",
    tags: ["TRADICIONAL", "COM LEITE"],
    image_url: "../assets/latte.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Cappuccino",
    description:
      "Bebida com canela feita de doses iguais de café, leite e espuma",
    tags: ["TRADICIONAL", "COM LEITE"],
    image_url: "../assets/cappuccino.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Macchiato",
    description:
      "Café expresso misturado com um pouco de leite quente e espuma",
    tags: ["TRADICIONAL", "COM LEITE"],
    image_url: "../assets/macchiato.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Mocaccino",
    description: "Café expresso com calda de chocolate, pouco leite e espuma",
    tags: ["TRADICIONAL", "COM LEITE"],
    image_url: "../assets/mochaccino.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Chocolate Quente",
    description: "Bebida feita com chocolate dissolvido no leite quente e café",
    tags: ["ESPECIAL", "COM LEITE"],
    image_url: "../assets/hot-chocolate.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Cubano",
    description:
      "Drink gelado de café expresso com rum, creme de leite e hortelã",
    tags: ["ESPECIAL", "ALCOÓLICO", "GELADO"],
    image_url: "../assets/cuban.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Havaiano",
    description: "Bebida adocicada preparada com café e leite de coco",
    tags: ["ESPECIAL"],
    image_url: "../assets/hawaiian.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Árabe",
    description: "Bebida preparada com grãos de café árabe e especiarias",
    tags: ["ESPECIAL"],
    image_url: "../assets/arabic.svg",
    price: 9.9,
  },
  {
    id: uuidV4(),
    name: "Irlandês",
    description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
    tags: ["ESPECIAL", "ALCOÓLICO"],
    image_url: "../assets/irish.svg",
    price: 9.9,
  },
];
