import React from "react";
import { render } from "@testing-library/react";
import About from "../components/About";

describe("About Component", () => {
  it("Render komponen About tanpa error", () => {
    const { getByTestId } = render(<About />);

    expect(getByTestId("about-title")).toBeInTheDocument();
    expect(getByTestId("about-caption-satu")).toBeInTheDocument();
    expect(getByTestId("about-caption-dua")).toBeInTheDocument();
  });

  it("Render gambar About", () => {
    const { getByAltText } = render(<About />);
    expect(getByAltText("About")).toBeInTheDocument();
  });
});
