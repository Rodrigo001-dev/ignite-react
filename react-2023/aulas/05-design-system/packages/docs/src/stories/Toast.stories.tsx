import { useEffect, useRef, useState } from "react"
import { Meta, StoryObj } from "@storybook/react"

import { Button, Toast, ToastProps } from "@ignite-ui/react"

const DemoToast = (props: ToastProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const timeRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timeRef.current)
  }, [])

  return (
    <div>
      <Button 
        onClick={() => {
          setIsOpen(false)
          window.clearTimeout(timeRef.current)
          timeRef.current = window.setTimeout(() => setIsOpen(true), 100)
        }}
      >
        Agendar
      </Button>
      <Toast open={isOpen} onOpenChange={setIsOpen} {...props} />
    </div>
  )
}

export default {
  title: 'Data display/Toast',
  component: DemoToast,
  args: {
    title: 'Agendamento realizado',
    description: 'Quarta-feita 23 de Outubro ás 16h'
  },
} as Meta<ToastProps>

export const Primary: StoryObj<ToastProps> = {}