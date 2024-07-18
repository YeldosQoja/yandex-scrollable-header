export interface Food {
  name: string;
  oldPrice?: number;
  price: number;
  calories: number;
  image: any;
}

export type Menu = Array<{
  title: string;
  items: Food[];
}>;
