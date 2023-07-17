import styled from 'styled-components'

export const ProfileContainer = styled.section`
  width: 100%;
  min-height: 13.25rem;
  margin-top: -5.5rem;
  background: ${({ theme }) => theme.colors['blue-700']};
  box-shadow: 0px 2px 28px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 2rem 2.5rem;
  display: flex;
  gap: 2rem;
`

export const ProfileAvatar = styled.img`
  width: 9.25rem;
  height: 9.25rem;
  border-radius: 8px;
  object-fit: cover;
`

export const ProfileDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    h1 {
      font-size: ${({ theme }) => theme.textSizes['title-l']};
      color: ${({ theme }) => theme.colors['gray-100']};
      line-height: 130%;
    }
  }

  ul {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: auto;

    li {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      svg {
        width: 1.125rem;
        height: 1.125rem;
        color: ${({ theme }) => theme.colors['gray-500']};
      }
    }
  }
`
