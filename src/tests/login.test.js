import React from "react";
import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from "../tests/helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Testa tela de Login", () => {

  it("Testa se os campos de email e nome estão na tela", () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId("input-player-name");
    expect(name).toBeInTheDocument();

    const email = screen.getByTestId("input-gravatar-email");
    expect(email).toBeInTheDocument();
  });

  it("Testa se é possível digitar nos campos de email e nome", () => {
    renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId("input-player-name");

    const email = screen.getByTestId("input-gravatar-email");

    userEvent.type(name, "lucas");
    userEvent.type(email, "teste@email.com");

    expect(name.value).toBe("lucas");
    expect(email.value).toBe("teste@email.com");
  });

  it("Testa se ao clicar no botão Configurações, redireciona para a página de Configurações", () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByTestId("btn-settings");
    userEvent.click(settingsButton);

    const { pathname } = history.location;
    expect(pathname).toBe("/settings");

  });

  it('Testa se quando os campos name e email são prenchidos o botão play habilita e redireciona ao ser clicado', async () => {
    const { history } = renderWithRouterAndRedux(<App />)
  
    const email = screen.getByTestId("input-gravatar-email");
    expect(email).toBeInTheDocument();
  
    const name = screen.getByTestId("input-player-name");
    expect(name).toBeInTheDocument();

    userEvent.type(name, "lucas");
    userEvent.type(email, "teste@email.com");

    const buttonPlay = screen.getByTestId("btn-play");
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeEnabled();
    userEvent.click(buttonPlay);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));

  });

});