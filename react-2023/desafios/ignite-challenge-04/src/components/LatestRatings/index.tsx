import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { ChartLineUp } from "@phosphor-icons/react"

import { api } from "@/lib/axios"

import { PageTitle } from "../ui/PageTitle"
import { Link } from "../ui/Link"
import { RatingWithAuthorAndBook, RatingCard } from "../RatingCard"

import { Container, LatestContainer } from "./styles"
import { Text } from "../Typography"

export const LatestRatings = () => {
  const { data: ratings } = useQuery<RatingWithAuthorAndBook[]>(["latest-ratings"], async () => {
    const { data } = await api.get("/ratings/latest");
    return data?.ratings ?? []
  })

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const { data: latestUserRating } = useQuery<RatingWithAuthorAndBook>(["latest-user-rating", userId], async () => {
    const { data } = await api.get("/ratings/user-latest")
    return data?.rating ?? null
  }, {
    enabled: !!userId
  })

  return (
    <Container>
      <PageTitle title="Início" icon={<ChartLineUp size={32} />} css={{
        marginBottom: 40
      }} />

      {latestUserRating && (
        <LatestContainer>
          <header>
            <Text size="sm">Sua última leitura</Text>

            <Link text="Ver todas" href={`/profile/${userId}`} />
          </header>

          <RatingCard variant="compact" rating={latestUserRating} />
        </LatestContainer>
      )}

      <Text size="sm">Avaliações mais recentes</Text>

      <section>
        {ratings?.map(rating => (
          <RatingCard key={rating.id} rating={rating} />
        ))}
      </section>
    </Container>
  )
}