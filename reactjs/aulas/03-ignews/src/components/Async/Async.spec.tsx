import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

test("it renders correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello World")).toBeInTheDocument();
  // o findByText vai esperar algo acontecer até um certo tempo, nesse caso vai
  // Button aparecer em tela espetar o texto
  // expect(await screen.findByText("Button")).toBeInTheDocument();

  // waitForElementToBeRemoved vai esperar um elemento ser removido da tela
  // await waitForElementToBeRemoved(screen.queryByText("Button"));

  // o waitFor vai espetar até o que foi retornado aparecer
  await waitFor(() => {
    return expect(expect(screen.getByText("Button")).toBeInTheDocument());
  });
});
