import React, { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import Carousel, { consts } from "react-elastic-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function RestaurantFilter({ currentFilter, changeFilter }) {
  const { documents } = useCollection("restaurants");
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  // React state that determines how many cuisines the user can see on the carousel, changes state depending on screen width
  const [cuisineNum, setCuisineNum] = useState(8);
  const cuisinesList = ["All"];

  for (let x in documents) {
    let cuisines = documents[x].cuisines;
    // console.log(cuisines);

    for (let y in cuisines) {
      cuisinesList.push(cuisines[y]);
    }
  }

  const filterList = cuisinesList.filter((c, index) => {
    return cuisinesList.indexOf(c) === index;
  });

  useEffect(() => {
    // Adds event listeners for document load and window resize so the program can decide how many cards should be on the carousel
    window.addEventListener("load", changeCarousel);
    window.addEventListener("resize", changeCarousel);
  }, []);

  return (
    <div className="restaurant-filter">
      <nav>
        <Carousel
          renderArrow={myArrow}
          className="carousel"
          itemsToShow={cuisineNum}
          pagination={false}
          itemsToScroll={4}
        >
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
        </Carousel>
      </nav>
    </div>
  );

  // Determines window width, and sets the carousel to counts of 3, 2 or 1
  function changeCarousel() {
    // Big laptop screens, tvs and monitors
    if (window.innerWidth > 1050) {
      setCuisineNum(8);
    }

    // Small laptops and tablets
    if (window.innerWidth < 1050) {
      setCuisineNum(7);
    }

    // Phones
    if (window.innerWidth < 750) {
      setCuisineNum(6);
    }
  }

  // function that custom styles the arrows on the Carousel
  function myArrow({ type, onClick, isEdge }) {
    const pointer =
      type === consts.PREV ? (
        <ArrowBackIosNewIcon className="arrow" />
      ) : (
        <ArrowForwardIosIcon className="arrow" />
      );
    return (
      <span className="arrow_box" onClick={onClick} disabled={isEdge}>
        {pointer}
      </span>
    );
  }
}
