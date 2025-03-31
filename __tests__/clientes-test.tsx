import React from "react";
import { render } from "@testing-library/react-native";
import Clientes from "@/app/clientes";

describe("Clientes Screen", () => {
  it('debería mostrar el texto "Clientes"', () => {
    const { getByText } = render(<Clientes />);

    const titleText = getByText("Clientes");

    expect(titleText).toBeTruthy();
  });
});
