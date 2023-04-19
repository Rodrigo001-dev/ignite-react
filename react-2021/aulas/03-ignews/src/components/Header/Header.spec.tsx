import { render, screen } from "@testing-library/react";
import { Header } from ".";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe("", () => {
  it("does not add active class if the link not currently active", () => {
    useRouter.mockImplementationOnce(() => ({
      query: { asPath: "/" },
    }));
    // o render vai renderizar um componente de uma maneira virtual, vai renderizar
    // de uma forma que seja possível ver qual o output de um componente
    render(<Header />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
