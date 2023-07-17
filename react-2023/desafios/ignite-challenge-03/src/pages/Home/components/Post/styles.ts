import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const PostContainer = styled(Link)`
  width: 100%;
  height: 16.25rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors['blue-800']};
  border: 2px solid ${({ theme }) => theme.colors['blue-800']};
  padding: 2rem;
  transition: 0.4s;

  &:hover {
    border-color: ${({ theme }) => theme.colors['gray-500']};
  }

  div {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.25rem;

    strong {
      flex: 1;
      font-size: ${({ theme }) => theme.textSizes['title-m']};
      color: ${({ theme }) => theme.colors['gray-100']};
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    span {
      width: max-content;
      font-size: ${({ theme }) => theme.textSizes['text-s']};
      color: ${({ theme }) => theme.colors['gray-400']};
    }
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
`
