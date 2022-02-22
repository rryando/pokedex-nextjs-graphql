import React from "react";
import { useRouter } from "next/router";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "../pages/index";
import pokemonData from "./mocks/pokemonData.json";

describe("Home", () => {
  it("renders a correctly", async () => {
    const { container } = render(<Home />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders a correctly with pokemonData", async () => {
    const { container } = render(<Home pokemonData={pokemonData} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders a correctly with pokemonData and search", async () => {
    const { container } = render(<Home pokemonData={pokemonData} />);

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "pikachu" },
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
