import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../app/index";

describe("Login Screen", () => {
  it("renders correctly with all elements", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    expect(getByText("CCP")).toBeTruthy();
    expect(getByText("COMPRAS FÁCILES, ENVÍOS RÁPIDOS")).toBeTruthy();
    expect(getByText("Bienvenido")).toBeTruthy();
    expect(getByText("¡Bienvenido inicio de sesión!")).toBeTruthy();

    expect(getByPlaceholderText("Usuario")).toBeTruthy();
    expect(getByPlaceholderText("Contraseña")).toBeTruthy();

    expect(getByText("Iniciar sesión")).toBeTruthy();
    expect(getByText("Regístrate")).toBeTruthy();
  });

  it("updates username input correctly", () => {
    const { getByPlaceholderText } = render(<Login />);
    const usernameInput = getByPlaceholderText("Usuario");

    fireEvent.changeText(usernameInput, "testuser");
    expect(usernameInput.props.value).toBe("testuser");
  });

  it("updates password input correctly", () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText("Contraseña");

    fireEvent.changeText(passwordInput, "testpass");
    expect(passwordInput.props.value).toBe("testpass");
  });

  it("calls handleLogin when login button is pressed", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    const usernameInput = getByPlaceholderText("Usuario");
    const passwordInput = getByPlaceholderText("Contraseña");
    const loginButton = getByText("Iniciar sesión");

    fireEvent.changeText(usernameInput, "testuser");
    fireEvent.changeText(passwordInput, "testpass");
    fireEvent.press(loginButton);
  });

  it("password input should have secureTextEntry enabled", () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText("Contraseña");

    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it("has correct styles", () => {
    const { getByText } = render(<Login />);
    const logoText = getByText("CCP");

    expect(logoText.props.style).toMatchObject({
      fontSize: 32,
      textAlign: "center",
    });
  });
});
