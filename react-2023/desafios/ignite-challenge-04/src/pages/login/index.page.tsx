import Head from "next/head";
import Image from "next/image";

import { Heading, Text } from "@/components/Typography";
import { AuthButtons } from "@/components/AuthButtons";

import { LogoContainer, LogoSection, WelcomeSection } from "./styles";

export default function Login() {
  return (
    <LogoContainer>
      <Head>
        <title>Login | BookWise</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      </Head>

      <LogoSection>
        <Image src="/images/logo.svg" height={58} width={232} alt="BookWise Logo" />
      </LogoSection>     
      <WelcomeSection>
        <Heading size="lg" color="gray-100">Boas vindas!</Heading>
        <Text color="gray-200">Faça seu login ou acesse como visitante.</Text>

        <AuthButtons canGuest />
      </WelcomeSection> 
    </LogoContainer>
  )
}