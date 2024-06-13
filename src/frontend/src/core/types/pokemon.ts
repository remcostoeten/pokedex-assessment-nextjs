export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

// niet helemaal enkel een type maar goed..
export const typeColors: { [key: string]: string } = {
  grass: "bg-green-500",
  fire: "bg-red-500",
  water: "bg-blue-500",
  bug: "bg-green-700",
  normal: "bg-gray-500",
};
