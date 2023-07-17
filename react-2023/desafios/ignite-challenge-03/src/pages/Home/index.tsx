import { useCallback, useEffect, useState } from 'react'

import { Profile } from './components/Profile'
import { SearchInput } from './components/SearchInput'
import { Post } from './components/Post'
import { Spinner } from '../../components/Spinner'

import { api } from '../../lib/axios'

import { PostListContainer } from './styles'

export interface PostType {
  title: string
  body: string
  created_at: string
  number: number
  html_url: string
  comments: number
  user: {
    login: string
  }
}

const username = import.meta.env.VITE_GITHUB_USERNAME
const repoName = import.meta.env.VITE_GITHUB_REPONAME

export function Home() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getPosts = useCallback(
    async (query: string = '') => {
      try {
        setIsLoading(true)
        const response = await api.get(
          `/search/issues?q=${query}%20label:documentation%20repo:${username}/${repoName}`,
        )

        setPosts(response.data.items)
      } finally {
        setIsLoading(false)
      }
    },
    [posts],
  )

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <Profile />
      <SearchInput postsLength={posts.length} getPosts={getPosts} />
      {isLoading ? (
        <Spinner />
      ) : (
        <PostListContainer>
          {posts.map((post) => (
            <Post key={post.number} post={post} />
          ))}
        </PostListContainer>
      )}
    </>
  )
}
