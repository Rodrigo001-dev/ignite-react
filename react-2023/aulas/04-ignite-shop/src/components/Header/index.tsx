import Image from 'next/image'
import { useRouter } from 'next/router'

import { Cart } from '../Cart'

import { HeaderContainer } from './styles'

import logoImg from '../../assets/logo.svg'

export function Header() {
  const { pathname } = useRouter()

  const showCartButton = pathname !== '/success'

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      {showCartButton && <Cart />}
    </HeaderContainer>
  )
}
