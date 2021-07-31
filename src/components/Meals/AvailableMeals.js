import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const API_URL =
    "https://foodmenubill-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json";

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>Loading...</p>
        )}
        {error && (
          <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
            {error}
          </p>
        )}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
