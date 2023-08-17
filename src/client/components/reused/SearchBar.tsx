import React, { useState, useEffect } from "react";
import SearchBarBuy from "../searchbarbody/SearchBarBuy";
import SearchBarRent from "../searchbarbody/SearchBarRent";

//We export enum so we don't need to redeclare it in the parent

export enum Tab {
  BUY,
  RENT
}

interface Props {
  [key: string]: Tab[] | Tab | (() => void);
  default: Tab;
  buttons: Tab[];
  detectChange?: () => void
}

const SearchBar: React.FC<Props> = (
  props: Props
): React.ReactElement<Props> => {
  const [type, setType] = useState(props.default);
  const theButtons = [];

  function handleBuy(event: React.MouseEvent<HTMLButtonElement>) {
    setType(Tab.BUY);
  }

  function handleRent(event: React.MouseEvent<HTMLButtonElement>) {
    //We are temporarily changing functionality while the owner decides if he wants to pay YGL API
    //setType(Tab.RENT);
    window.open(
      "https://ygl.is/unionrealtygroup/",
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  if (props.buttons.includes(Tab.BUY)) {
    theButtons.push(<button key="buy" className={`searchbar-button-top  ${type === Tab.BUY ? 'searchbar-active' : ''}`} onClick={handleBuy}>BUY</button>);
  }
  if (props.buttons.includes(Tab.RENT)) {
    theButtons.push(<button key="rent" className={`searchbar-button-top  ${type === Tab.RENT ? 'searchbar-active' : ''}`} onClick={handleRent}>RENT</button>);
  }

  let theSearch;

  if (type === Tab.BUY) {
    theSearch = <SearchBarBuy detectChange={props.detectChange} />;

  } else if (type === Tab.RENT) {
    theSearch = <SearchBarRent />;
  }

  return (
    <React.Fragment>
      <div className="searchbar-container">
        <div className="searchbar-header">{theButtons}</div>
        {theSearch}
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
