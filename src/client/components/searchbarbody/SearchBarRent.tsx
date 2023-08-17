import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';

const SearchBarBuy = () => {
  const [location, setLocation] = useState("Search");
  const [minPrice, setMinPrice] = useState("800");
  const [maxPrice, setMaxPrice] = useState("2000");
  const [bedrooms, setBedroom] = useState("Search");

  function handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }
  function handleMaxPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMaxPrice(event.target.value);
  }
  function handleMinPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMinPrice(event.target.value);
  }
  function handleBedroomChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBedroom(event.target.value);
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) { }
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="searchbar-body">
          <div className="searchbar-innercontiainer">


            <div className="searchbar-input">
              <TextField

                name="location"
                label="Location"
                type="text"
                variant="outlined"
                onChange={handleLocationChange}
              />
            </div>

            <div className="searchbar-input">
              <TextField

                name="minprice"
                label="Min Price."
                type="text"
                variant="outlined"
                onChange={handleMinPriceChange}
              />
            </div>
          </div>
          <div className="searchbar-innercontiainer">
            <div className="searchbar-input">
              <TextField

                name="maxprice"
                label="Max Price."
                type="text"
                variant="outlined"
                onChange={handleMaxPriceChange}
              />
            </div>
            <div className="searchbar-input">
              <TextField

                name="bedrooms"
                label="Bedrooms"
                type="text"
                variant="outlined"
                onChange={handleMaxPriceChange}
              />
            </div>




          </div>
          <button className="searchbar-button"> Search</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SearchBarBuy;
