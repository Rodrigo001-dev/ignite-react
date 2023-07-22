import { styled } from '../styles'

const Button = styled('button', {
  backgroundColor: '$green300',
  borderRadius: 4,
  border: 0,
  padding: '4px 8px',
  color: 'white',
  fontWeight: 'bold',
})

export default function Home() {
  return <Button>Enviar</Button>
}
