console.log(window);

import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
        components: {
    Carousel3d,
        Slide
}
};

new Vue({
    el: '#example',
    data: {
        slides: 7
    },
    components: {
        'carousel-3d': window['carousel-3d'].Carousel3d,
        'slide': window['carousel-3d'].Slide
    }
})