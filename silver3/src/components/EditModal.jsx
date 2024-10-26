import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Textarea
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {useState} from "react";
import {updateProduct} from "../api.js";


export const EditModal = (props) => {

    const [product, setProduct] = useState(props.product);

    // console.log(product);

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Product</ModalHeader>
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
                    <Button colorScheme='blue' mr={3} onClick={()=>{
                        updateProduct(product.id, product).then(() => {
                            props.onClose();
                        })
                    }}>
                        Save
                    </Button>
                    <Button colorScheme='red' onClick={props.onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

// prop validation
EditModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}