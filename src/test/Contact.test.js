import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Contact from "../components/Contact";

describe("Komponen Contact", () => {
  it("Render Komponen", () => {
    render(<Contact />);
    const contactElement = screen.getByText("Get in touch with us!");
    expect(contactElement).toBeInTheDocument();
  });

  it("Mengirim Form", () => {
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email address");
    const subjectInput = screen.getByPlaceholderText("Subject");
    const messageInput = screen.getByPlaceholderText("Message");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Nandha Yuana Djunaidi" } });
    fireEvent.change(emailInput, { target: { value: "nandha.yoyo@gmail.com" } });
    fireEvent.change(subjectInput, { target: { value: "Test Code REACT JS" } });
    fireEvent.change(messageInput, { target: { value: "Ini adalah contoh isi pesan dalam test" } });

    fireEvent.submit(screen.getByTestId("contact-form"));
  });
});
