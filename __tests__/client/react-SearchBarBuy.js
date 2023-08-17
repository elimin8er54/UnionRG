/**
 * @jest-environment jsdom
 */
import SearchBarBuy from '../../src/client/components/searchbarbody/SearchBarBuy';
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

it("renders and fetches", async (done) => {
  const mockSuccessResponse = [];
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });
  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  await act(async () => {

    render(<Router><SearchBarBuy /></Router>, container);
  });

  expect(
    container.querySelector(".searchbar-button-clear").getAttribute("type")
  ).toEqual("button");

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('/mls/gettowns', { "body": "{}", "headers": { "Content-Type": "application/json" }, "method": "POST" });
  process.nextTick(() => { // 6


    global.fetch.mockClear(); // 7
    done(); // 8
  });

});
