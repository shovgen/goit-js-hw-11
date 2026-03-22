
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGalerry, showLoad, hiddenLoad } from './js/render-functions';

import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');




form.addEventListener('submit',async (e) => {
    e.preventDefault();
 
    const query = e.currentTarget.elements['search-text'].value.trim();
    if (!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search text!',
        });
        return
    }

    clearGalerry();
    showLoad();

    try {
        const data = await
        getImagesByQuery(query);
        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
        } else {
            createGallery(data.hits);
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Somsing wrong, please try again.',
        });
        console.log(error);

    } finally {
        hiddenLoad();
        form.reset();
    }

   
});