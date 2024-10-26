import PropTypes from "prop-types";
import {useState} from "react";
import {Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea} from "@chakra-ui/react";
import {addProduct} from "../api.js";


export const AddProductModal = (props) => {

    const [product, setProduct] = useState({name: '', description: '', price: 0, quantity: 0, image: ''});


    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' placeholder='Product Name' value={product.name}
                        onChange={(e) => setProduct({...product, name: e.target.value})}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder='Product Description'
                        value={product.description}
                        onChange={(e) => setProduct({...product, description: e.target.value})}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Price</FormLabel>
                        <Input type='number' placeholder='Product Price'
                        value={product.price}
                        onChange={(e) => setProduct({...product, price: e.target.value})}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Quantity</FormLabel>
                        <Input type='number' placeholder='Product Quantity'
                        value={product.quantity}
                        onChange={(e) => setProduct({...product, quantity: e.target.value})}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Image URL</FormLabel>
                        <Input type='text' placeholder='Product Image URL'
                        value={product.image}
                        onChange={(e) => setProduct({...product, image: e.target.value})}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' onClick={() => {
                        addProduct(product).then(() => {
                            props.onClose();
                            window.location.reload();
                        })
                    }}>Add</Button>
                    <Button onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

// prop validation
AddProductModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}