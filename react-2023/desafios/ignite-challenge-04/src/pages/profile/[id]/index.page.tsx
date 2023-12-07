import { type ReactElement } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"

import { api } from "@/lib/axios"

import { DefaultLayout } from "@/layouts/DefaultLayout"
import { ProfileDetails } from "@/components/ProfileDetails"
import { ProfileRating, ProfileRatings } from "@/components/ProfileRatings"

import { NextPageWithLayout } from "../../_app.page"
import { HomeContainer } from "../../home/styles"

export type ProfileData = {
  ratings: ProfileRating[]
  user: {
    avatar_url: string
    name: string
    member_since: string
  }
  readPages: number
  ratedBooks: number
  readAuthors: number
  mostReadCategory?: string
}

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter();
  const userId = router.query.id as string;

  const { data: session } = useSession();

  const isOwnProfile = session?.user?.id === userId;

  const { data: profile } = useQuery<ProfileData>(["profile", userId], async () => {
    const { data } = await api.get(`/profile/${userId}`)
    return data?.profile ?? {}
  }, {
    enabled: !!userId
  })

  return (
    <HomeContainer>
      {!!profile ? (
        <>
          <ProfileRatings isOwnProfile={isOwnProfile} ratings={profile?.ratings} />
          <ProfileDetails profile={profile} />
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
    </HomeContainer>
  )
}

ProfilePage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout title="Perfil">
      {page}
    </DefaultLayout>
  )
}

export default ProfilePage