import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmoothieCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const fetchSmoothies = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .select()
      .order(orderBy, { ascending: false });

    if (error) {
      setFetchError(error);
      setSmoothies(null);
      console.log(error);
    }
    if (data) {
      setSmoothies(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by: </p>
            <button onClick={() => setOrderBy("created_at")}>Time</button>
            <button onClick={() => setOrderBy("title")}>title</button>
            <button onClick={() => setOrderBy("rating")}>rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => {
              return (
                <SmoothieCard
                  key={smoothie.id}
                  smoothie={smoothie}
                  onDelete={() => fetchSmoothies()}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
