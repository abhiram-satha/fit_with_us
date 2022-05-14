import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserDietaryRestrictions(props) {
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

  async function getDietaryRestrictions() {
    const response = await axios.get(
      "http://localhost:8080/api/dietary_restrictions"
    );

    const dietaryRestrictionsArray = response["data"]["dietary_restrictions"];
    return dietaryRestrictionsArray;
  }

  useEffect(async () => {
    const dietaryRestrictionsArray = await getDietaryRestrictions();
    console.log(dietaryRestrictionsArray);
  }, []);
  return <></>;
}
