

// fetch product

const backend = 'https://giva-xd23.onrender.com';

export const fetchProducts = async () => {
    const response = await fetch(`${backend}/api/products`);
    // console.log(response);
    return await response.json();
}

export const addProduct = async (product) => {
    const response = await fetch(`${backend}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return await response.json();
}


export const deleteProduct = async (id) => {
    const response = await fetch(`${backend}/api/products/${id}`, {
        method: 'DELETE'
    });
    return await response.json();
}

export const updateProduct = async (id, product) => {
    console.log(product);
    const response = await fetch(`${backend}/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    return await response.json();
}