import React from "react";
import { render } from "@testing-library/react-native";
import Visitas from "@/app/visitas";

describe("Visitas Screen", () => {
  it('debería mostrar el texto "Visitas"', () => {
    const { getByText } = render(<Visitas />);

    const titleText = getByText("Visitas");

    expect(titleText).toBeTruthy();
  });
});
