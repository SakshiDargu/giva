import {
    Box,
    Button, FormControl, FormLabel,
    HStack,
    Image, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, SimpleGrid,
    Text, Textarea,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {PlusIcon} from "../assets/icons.jsx";
import {useEffect, useState} from "react";
import {jewelleryList} from "../assets/dummy.js";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {EditModal} from "./EditModal.jsx";
import {AddProductModal} from "./AddProductModal.jsx";
import {fetchProducts, updateProduct} from "../api.js";
import DeleteModal from "./DeleteProductModal.jsx";



export function Page() {

    // const [products, setProducts] = useState(jewelleryList);
    const [products, setProducts] = useState([]);
    const [editableProduct, setEditableProduct] = useState({});
    const [product, setProduct] = useState({name: '', description: '', price: 0, quantity: 0, image: ''});
    const modalOneDisclosure = useDisclosure();
    const modalTwoDisclosure = useDisclosure();
    const modalThreeDisclosure = useDisclosure();

    useEffect(() => {
        fetchProducts().then((data) => {
            // console.log(data);
            setProducts(data);
        })
    },[])

    const EditProduct = (product) => {
        console.log('product', product);
        setEditableProduct(product);
        modalTwoDisclosure.onOpen();
        // setTimeout(() => modalTwoDisclosure.onOpen(), 0);
    }




    // background-image: linear-gradient(to top, #5ee7df 0%, #b490ca 100%);
    return (
        <>
            <Box w='100%' p='64px' bg='linear-gradient(to top, #5ee7df 0%, #b490ca 100%)'>
                <VStack alignItems='left' spacing='20px' w='100%'>
                    <Text textAlign='left' fontSize="4xl" >Products</Text>
                    <Button size='md' w='200px' onClick={modalOneDisclosure.onOpen} leftIcon={<PlusIcon/>} colorScheme="blue">Add Product</Button>
                    <AddProductModal isOpen={modalOneDisclosure.isOpen} onClose={modalOneDisclosure.onClose}/>
                    <VStack w='100%'  spacing={8}>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} w='100%'>
                            {products.map((product) => (
                                <Box
                                    key={product.id}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    bg='white'
                                    boxShadow='md'
                                    p={4}
                                    textAlign='left'
                                >
                                    <Image src={product.image} alt={product.name} h='200px' w='100%' objectFit='cover' />
                                    <VStack alignItems='left' spacing={2} mt={2}>
                                        <Text fontSize='xl'>{product.name}</Text>
                                        <Text noOfLines={1} fontSize='md' color='gray.600'>{product.description}</Text>
                                        <Text fontSize='lg' color='gray.600'>₹{product.price}</Text>
                                        <Text fontSize='lg' color='gray.600'>Quantity: {product.quantity}</Text>
                                    </VStack>
                                    <HStack w='100%' justifyContent='space-between'>
                                        <Button leftIcon={<EditIcon />} size='sm' colorScheme='blue' mt={4} onClick={() => EditProduct(product)}>
                                            Edit
                                        </Button>
                                        <Button leftIcon={<DeleteIcon />} size='sm' colorScheme='red' mt={4} onClick={modalThreeDisclosure.onOpen}>
                                            Delete
                                        </Button>
                                    </HStack>
                                    <DeleteModal isOpen={modalThreeDisclosure.isOpen} onClose={modalThreeDisclosure.onClose} productId={product.id} />
                                </Box>
                            ))}
                        </SimpleGrid>
                        {/*<EditModal isOpen={modalTwoDisclosure.isOpen} onClose={modalTwoDisclosure.onClose} product={editableProduct}/>*/}
                    </VStack>
                </VStack>

                <Modal isOpen={modalTwoDisclosure.isOpen} onClose={modalTwoDisclosure.onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input type='text' placeholder='Product Name' value={editableProduct.name}
                                       onChange={(e) => setEditableProduct({...editableProduct, name: e.target.value})}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder='Product Description'
                                          value={editableProduct.description}
                                          onChange={(e) => setEditableProduct({...editableProduct, description: e.target.value})}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input type='number' placeholder='Product Price'
                                       value={editableProduct.price}
                                       onChange={(e) => setEditableProduct({...editableProduct, price: e.target.value})}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Quantity</FormLabel>
                                <Input type='number' placeholder='Product Quantity'
                                       value={editableProduct.quantity}
                                       onChange={(e) => setEditableProduct({...editableProduct, quantity: e.target.value})}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Image URL</FormLabel>
                                <Input type='text' placeholder='Product Image URL'
                                       value={editableProduct.image}
                                       onChange={(e) => setEditableProduct({...editableProduct, image: e.target.value})}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={()=>{
                                updateProduct(editableProduct.id, editableProduct).then(() => {
                                    modalTwoDisclosure.onClose();
                                    window.location.reload();
                                })
                            }}>
                                Save
                            </Button>
                            <Button colorScheme='red' onClick={modalTwoDisclosure.onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Box>
        </>
    )
}