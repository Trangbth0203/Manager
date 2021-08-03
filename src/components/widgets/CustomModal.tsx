import React, { Dispatch, FC, ReactNode } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap'
import { Loading } from '~/src/components/elements/loading'

interface Props {
  title: string
  show: boolean
  isLoading?: boolean
  setShow?: Dispatch<boolean>
  className?: string
  children: string | ReactNode
  textRightButton?: string
  textLeftButton?: string
  clickRightButton?: () => void
  clickLeftButton?: () => void
}

export const CustomModal: FC<Props> = ({
  show,
  setShow,
  isLoading,
  title,
  className,
  children,
  textRightButton = 'Lưu',
  textLeftButton = 'Đóng',
  clickRightButton,
  clickLeftButton,
}) => {
  return (
    <div>
      <Modal isOpen={show} className={className} toggle={() => {
        if (clickLeftButton) {
          clickLeftButton()
        }
        setShow(false)
      }}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              if (clickLeftButton) {
                clickLeftButton()
              }
              setShow(false)
            }}
          >
            {textLeftButton}
          </Button>
          <Button color="primary" onClick={clickRightButton}>
            {isLoading ? <Loading /> : textRightButton}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
