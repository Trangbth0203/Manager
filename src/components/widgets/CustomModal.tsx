import React, { Dispatch, FC, ReactNode } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

interface Props {
  title: string
  show: boolean
  setShow: Dispatch<boolean>
  className?: string
  children: string | ReactNode
  textRightButton?: string
  textLeftButton?: string
  clickRightButton?: () => void
}

export const CustomModal: FC<Props> = ({
  show,
  setShow,
  title,
  className,
  children,
  textRightButton = 'Lưu',
  textLeftButton = 'Đóng',
  clickRightButton,
}) => {

  return (
    <div>
      <Modal isOpen={show} className={className} toggle={() => setShow(false)}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setShow(false)}>
            {textLeftButton}
          </Button>
          <Button color="primary" onClick={clickRightButton}>
            {textRightButton}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
