import Link from 'next/link'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

import {
  SuccessContainer,
  ImagesContainer,
  ImageContainer,
} from '@/styles/pages/success'
import Image from 'next/image'

interface SuccessProps {
  customerName: string
  productsImages: string[]
}

export default function Success({
  customerName,
  productsImages,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        {/* Estou pedindo para essa página não ser indexada */}
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesContainer>
          {productsImages.map((image, i) => (
            <ImageContainer key={i}>
              <Image src={image} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua camiseta{' '}
          {productsImages.length} camiseta(s) já está a caminho da sua casa.
        </p>

        <Link href={'/'}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details!.name
  const productsImages = session.line_items!.data.map((item) => {
    const product = item.price?.product as Stripe.Product

    return product.images[0]
  })
  return {
    props: {
      customerName,
      productsImages,
    },
  }
}
