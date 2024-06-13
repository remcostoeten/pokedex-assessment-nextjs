"use client";

import { useEffect, useState } from "react";
import { GET_POKEMON } from "@/core/config";

export default function _DisplayApi() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  // nextjs zet automatisch de env variabelen in op prod of dev, dus hoeven het zelf niet bij te houden

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(GET_POKEMON);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <pre className="bg-white h-[600px] overflow-y-scroll p-4">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}
