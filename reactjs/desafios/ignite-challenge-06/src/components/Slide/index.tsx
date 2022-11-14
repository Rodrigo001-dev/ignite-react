import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideItem } from './Item';

import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export function Slide() {
  return (
    <Swiper
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      style={{width: '100%', flex: '1', height: '100%'}}
    >
      <SwiperSlide>
        <SlideItem 
          title='Europa'
          description='O continente mais antigo.'
          link='europa'
          imageSrc="/images/europe.jpg"
        />
      </SwiperSlide>

      <SwiperSlide>
        <SlideItem 
          title='Ásia'
          description='O continente mais populoso.'
          link='asia'
          imageSrc="/images/asia.jpg"
        />
      </SwiperSlide>

      <SwiperSlide>
        <SlideItem 
          title='África'
          description='O continente mais colorido.'
          link='africa'
          imageSrc="/images/africa.jpg"
        />
      </SwiperSlide>

      <SwiperSlide>
        <SlideItem 
          title='América do Sul'
          description='O melhor continente.'
          link='south-america'
          imageSrc="/images/south-america.jpg"
        />
      </SwiperSlide>

      <SwiperSlide>
        <SlideItem 
          title='América do Norte'
          description='O continente mais tecnológico.'
          link='north-ameria'
          imageSrc="/images/north-america.jpg"
        />
      </SwiperSlide>

      <SwiperSlide>
        <SlideItem 
          title='Oceania'
          description='O continente mais peculiar.'
          link='oceania'
          imageSrc="/images/oceania.jpg"
        />
      </SwiperSlide>
    </Swiper>
  )
}