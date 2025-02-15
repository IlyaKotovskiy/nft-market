import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import s from './Slider.module.scss';
import ArrowIcon from '@/icons/arrow-slide-btn.svg?react'
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';

interface SliderProps {
    children: React.ReactNode;
}

export const Slider: React.FC<SliderProps> = ({ children }) => {
    const swiperRef = useRef(null);

    return (
        <>
            <Swiper
                onSwiper={swiper => swiperRef.current = swiper}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={'auto'}
                className={s.customSwiper}
            >
                {Array.isArray(children)
                    ? children.map((child, index) => <SwiperSlide key={index} className={s.customSlide}>{child}</SwiperSlide>)
                    : <SwiperSlide className={s.customSlide}>{children}</SwiperSlide>}
                <div className={s.btns}>
                    <button className={`${s.customBtn} prev`} onClick={() => swiperRef.current?.slidePrev()}><ArrowIcon/></button>
                    <button className={`${s.customBtn} ${s.customBtnNext}`} onClick={() => swiperRef.current?.slideNext()}><ArrowIcon/></button>
                </div>
            </Swiper>
        </>
    );
};