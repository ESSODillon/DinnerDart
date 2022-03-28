import { useCollection } from "../../hooks/useCollection";

export default function RestaurantFilter({ currentFilter, changeFilter }) {
  const { documents } = useCollection("restaurants");
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  const cuisinesList = ["All"];

  for (let x in documents) {
    let cuisines = documents[x].cuisines;

    for (let y in cuisines) {
      cuisinesList.push(cuisines[y]);
    }
  }

  const filterList = cuisinesList.filter((c, index) => {
    return cuisinesList.indexOf(c) === index;
  });

  return (
    <div className="restaurant-filter">
      <nav>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            // when the current filter matches f, apply a class of active
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
