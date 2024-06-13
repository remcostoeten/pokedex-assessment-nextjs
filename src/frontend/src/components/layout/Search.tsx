// ToDo: Logic for search bar

import React from "react";
import { Input } from "../ui/input";

function Search({ Propdrill }: { Propdrill: any }) {
  return (
    <div className="mt-4">
      <Input onChange={Propdrill} placeholder="Search your Pokémon!" />
    </div>
  );
}

export default Search;
