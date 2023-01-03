import { render } from "@testing-library/react";
import { ActiveLink } from ".";

// os mocks(imitações) são utilizados sempre que algo que está sendo testado estiver
// utilizando uma funcionalidade que é externa a aquele componente
// jest.mock("next/router", () => {
//   return {
//     useRouter() {
//       return {
//         asPath: "/",
//       };
//     },
//   };
// });

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("ActiveLink component", () => {
  it("renders correctly", () => {
    useRouter.mockImplementationOnce(() => ({
      query: { asPath: "/" },
    }));
    // o render vai renderizar um componente de uma maneira virtual, vai renderizar
    // de uma forma que seja possível ver qual o output de um componente
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home")).toBeInTheDocument();
  });

  it("does not add active class if the link not currently active", () => {
    useRouter.mockImplementationOnce(() => ({
      query: { asPath: "/" },
    }));
    // o render vai renderizar um componente de uma maneira virtual, vai renderizar
    // de uma forma que seja possível ver qual o output de um componente
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByText("Home").classList.contains("active")).toBe(false);
  });
});
