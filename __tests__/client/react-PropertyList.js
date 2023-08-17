/**
 * @jest-environment jsdom
 */
import PropertyList from '../../src/client/components/reused/PropertyList';
import 'regenerator-runtime/runtime'
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders and fetches properties from a database through a route once", async (done) => {
  const mockSuccessResponse = {
    total: 15, values: [{
      NO_BEDROOMS: "2",
      NO_FULL_BATHS: "1",
      UNIT_NO: "12",
      STREET_NO: "32",
      STREET_NAME: "Cool Rd.",
      LONG: "Waltham",
      STATE: "MA",
      ZIP_CODE: "12233",
      SQUARE_FEET: "5232",
      LIST_NO: "7453",
      LIST_PRICE: "20000"
    },
    {
      NO_BEDROOMS: "2",
      NO_FULL_BATHS: "1",
      UNIT_NO: "53",
      STREET_NO: "2",
      STREET_NAME: "Hot St.",
      LONG: "Newton",
      STATE: "MA",
      ZIP_CODE: "521",
      SQUARE_FEET: "743",
      LIST_NO: "236",
      LIST_PRICE: "333"

    }]
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });

  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  const totalPages = (thePages) => { }
  await act(async () => {

    render(<Router><PropertyList
      currentPage={0}
      totalPages={totalPages}
      search={"?location=&minprice=&maxprice=&type=&bedroom=&bathroom=&bathroomhalf="} /></Router>, container);
  });

  expect()
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('/mls/getproperties',
    {
      "body":
        "{\"bedroom\":\"\",\"bathroom\":\"\",\"location\":\"Newton\",\"minprice\":\"\",\"maxprice\":\"\",\"bathroomhalf\":\"\",\"type\":\"\",\"currentpage\":-1}", "headers": { "Content-Type": "application/json" }, "method": "POST"
    });

  process.nextTick(() => { // 6
    done(); // 8
  });

});
