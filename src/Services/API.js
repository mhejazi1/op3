import axios from 'axios';
const main = 'https://ownproperties.herokuapp.com';
const base = 'https://ownproperties.herokuapp.com/properties';

const getProperties = () => axios.get(base);
const getProperty = (id) => axios.get(base + '/' + id);
const createProperty = (property) => axios.post(base, property);
const deleteProperty = (id) => axios.delete(base + '/' + id);
const updateProperty = (property, id) => axios.patch(base + '/' + id, property);
const getFeaturedProperties = () => axios.get(base + '/featured');
const uploadImages = (formData) => fetch(main + '/uploads', { method: 'POST', body: formData });
const deleteImage = (id) => axios.delete(main + '/uploads/delete/' + id);

export const API = {
    getProperties,
    getProperty,
    createProperty,
    deleteProperty,
    updateProperty,
    getFeaturedProperties,
    uploadImages,
    deleteImage,
    main
}