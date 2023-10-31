import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import { AuthButton, Container } from "./styles";

type AuthButtonsProps = {
  canGuest?: boolean
  callbackUrl?: string
}

export function AuthButtons({ canGuest, callbackUrl = "/" }: AuthButtonsProps) {
  const router = useRouter();

  function handleSignIn(provider?: string) {
    if(!provider) {
      router.push("/")
      return
    }

    signIn(provider, {
      callbackUrl
    })
  }
  return (
    <Container>
      <AuthButton onClick={() => handleSignIn("google")}>
        <Image src="/images/icons/google.svg" width={32} height={32} alt="Google Logo" /> 
        Entrar com Google
      </AuthButton>
      <AuthButton onClick={() => handleSignIn("github")}>
        <Image src="/images/icons/github.svg" width={32} height={32} alt="Github Logo" /> 
        Entrar com Github
      </AuthButton>
      {canGuest && (
        <AuthButton onClick={() => handleSignIn()}>
          <Image src="/images/icons/rocket.svg" width={32} height={32} alt="Rocket Icon" />
          Acessar como visitante
        </AuthButton>
      )}
    </Container>
  )
}