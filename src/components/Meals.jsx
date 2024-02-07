import React, { useCallback, useEffect, useState } from "react";
import MealItem from "./MealItem";
import Error from "./Error";

function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);
  const [error, setError] = useState();
  const [isLogin, setIslogin] = useState(null);

  const fetchMeals = useCallback(async () => {
    setIslogin(true);

    try {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    } catch (error) {
      setError(error.massege || "Something sent wrong!");
    }
    setIslogin(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  if (isLogin) {
    return <p className="center">Fetching meals. . .</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" massege={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
export default Meals;
