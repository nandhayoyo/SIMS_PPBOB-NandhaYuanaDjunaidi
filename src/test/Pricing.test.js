import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pricing from "../components/Pricing";
import Modal from "../components/Modal"; 

test("renders Pricing component correctly", () => {
  const { getByTestId } = render(<Pricing />);

  const aboutTitle = getByTestId("about-title");
  const aboutTitleCaption = getByTestId("about-title-caption");
  const pricingCards = getByTestId("pricing-cards");

  const tierContainerSatu = getByTestId("tier-container-satu");
  const tierContainerDua = getByTestId("tier-container-dua");
  const tierContainerTiga = getByTestId("tier-container-tiga");

  const tierCardSatu = getByTestId("pricing-card-satu");
  const tierCardDua = getByTestId("pricing-card-dua");
  const tierCardTiga = getByTestId("pricing-card-tiga");

  expect(aboutTitle).toBeInTheDocument();
  expect(aboutTitleCaption).toBeInTheDocument();
  expect(pricingCards).toBeInTheDocument();

  expect(tierContainerSatu).toBeInTheDocument();
  expect(tierContainerDua).toBeInTheDocument();
  expect(tierContainerTiga).toBeInTheDocument();

  expect(tierCardSatu).toBeInTheDocument();
  expect(tierCardDua).toBeInTheDocument();
  expect(tierCardTiga).toBeInTheDocument();
});

test("Button BUY akan memunculkan Modal Login", () => {
  render(
    <div>
      <Pricing />
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal content here</div>
      </Modal>
    </div>
  );

  const tierBuySatu = screen.getByTestId("tier-buy-satu");
  fireEvent.click(tierBuySatu);

  const modalContent = screen.getByText("Login");
  expect(modalContent).toBeInTheDocument();
});
