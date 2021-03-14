import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

export function ModalTemplate({ isOpen, onClose, title, children }) {


    return (
        <Modal isOpen={isOpen} onClose={onClose}
            size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader borderBottom="1px solid grey" textTransform="uppercase" >{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody padding="2rem">
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}