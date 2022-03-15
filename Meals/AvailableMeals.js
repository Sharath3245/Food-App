import { useEffect, useState } from "react";
import "./AvailableMeals.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";

function AvailableMeals() {
  const [Meals, setMeals] = useState([]);
  const [Isloading, setIsloading] = useState(true);
  const [error, seterror] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
     
      const response = await fetch(
        'https://sharath-e1aa4-default-rtdb.firebaseio.com/Meals.json'
      );

      if(!response.ok){
        throw new Error("Something went wrong!");
      }
      const responsedata = await response.json();
      //console.log(responsedata)

      const loadedmeals = [];
      for (const key in responsedata) {
        loadedmeals.push({
          id: key,
          name: responsedata[key].name,
          description: responsedata[key].description,
          price: responsedata[key].price,
        });
      }
      setMeals(loadedmeals);
      setIsloading(false)
    };
    
    fetchMeals().catch((error)=>{
      setIsloading(false)
      seterror(error.message)
    });
   
  }, []);
  if(Isloading){
    return(
    <section>
    <p className="loading">  Loading...</p>
    </section>)
  };
  if(error){
    return(<section className="error">
      <p> {error}</p>

    </section>)
  }

  const mealslist = Meals.map((meal) => (
    <MealsItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className="meals">
      <Card>
        <ul className="ul">{mealslist}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
