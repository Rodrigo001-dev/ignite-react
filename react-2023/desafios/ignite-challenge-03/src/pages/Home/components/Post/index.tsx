import { relativeDateFormatter } from '../../../../utils/formatter'

import { PostContainer } from './styles'

import { PostType } from '../..'

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {
  const formatterDate = relativeDateFormatter(post.created_at)

  return (
    <PostContainer to={`/post/${post.number}`}>
      <div>
        <strong>{post.title}</strong>
        <span>{formatterDate}</span>
      </div>
      <p>{post.body}</p>
    </PostContainer>
  )
}
