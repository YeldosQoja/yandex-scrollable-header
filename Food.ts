export interface Food {
  name: string;
  oldPrice?: number;
  price: number;
  calories: number;
  image: any;
}

export interface Menu {
  offers: Food[];
  combos: Food[];
  burgers: Food[];
  fries: Food[];
  drinks: Food[];
}
