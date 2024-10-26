
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import PropTypes from "prop-types";
import {deleteProduct} from "../api.js";

export default function DeleteModal(props) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this product?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' onClick={() => {
                        deleteProduct(props.productId)
                        .then(() => {
                            props.onClose();
                            window.location.reload();
                        })
                    }}>Delete</Button>
                    <Button onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

// prop validation
DeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    productId: PropTypes.number.isRequired,
}