import { Text } from '../Text'
import { styled } from '../../styles'

export const MultiStepContainer = styled('div', {})

export const Label = styled(Text, {
  color: '$gray200',
  
  defaultVariants: {
    size: '$xs',
  }
})

export const Steps = styled('div', {
  display: 'grid',
  gap: '$2',
  gridTemplateColumns: 'repeat(var(--steps-size), 1fr)',
  marginTop: '$1',
})

export const Step = styled('div', {
  height: '$1',
  borderRadius: '$px',
  backgroundColor: '$gray600',

  variants: {
    active: {
      true: {
        backgroundColor: '$gray100',
      }
    }
  },
})