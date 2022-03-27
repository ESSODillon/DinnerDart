const filterList = [
  "All",
  "American",
  "Asian",
  "Fast Food",
  "Pizza",
  "Chicken",
  "Breakfast",
];

export default function RestaurantFilter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

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
