import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app.page"

import { DefaultLayout } from "@/layouts/DefaultLayout"

import { LatestRatings } from "@/components/LatestRatings"
import { PopularBooks } from "@/components/PopularBooks"

import { HomeContainer } from "./styles"

const HomePage: NextPageWithLayout = () => {
  return (
    <HomeContainer>
      <LatestRatings />
      <PopularBooks />
    </HomeContainer>
  )
}

HomePage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout title="Início">
      {page}
    </DefaultLayout>
  )
}

export default HomePage