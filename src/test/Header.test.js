import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";  
import { MemoryRouter } from "react-router-dom";

import Header from "../components/Header";

describe("Header Component", () => {
  it("Render gada error", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <MemoryRouter history={history}>
        <Header />
      </MemoryRouter>
    );
    expect(getByText("ERP Website")).toBeInTheDocument();
  });

  it("Resposive Menu", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <MemoryRouter history={history}>
        <Header />
      </MemoryRouter>
    );
    const menuIcon = getByTestId("menu-icon");
    const nav = getByTestId("nav");

    expect(nav).not.toHaveClass("active");

    fireEvent.click(menuIcon);

    expect(nav).toHaveClass("active");
  });

  it("Contoh satu | Test untuk navigasi Home", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <MemoryRouter history={history}>
        <Header />
      </MemoryRouter>
    );

    const linkHome = getByText("Home");
    fireEvent.click(linkHome);
    expect(history.location.pathname).toBe("/");
    expect(linkHome).toBeEnabled();
  });

});
