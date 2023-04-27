import axios from "axios"

const getBoughtProduct = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8000/api/buy').then((res) => {
            resolve(res.data)
        }).catch((error) => {
            reject(error.response)
        })
    })
}

const deleteBougthProduct = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:8000/api/buy/${id}`)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err))
    })
}

export {
    getBoughtProduct,
    deleteBougthProduct
}