import React from 'react';
import { destinationImages } from '../mock';

const Destination = () => {
  return (
    <section id="destination" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[340px] md:min-h-[440px]">
        <div className="img-zoom h-[260px] md:h-auto">
          <img
            src={destinationImages.left}
            alt="Destination beach bride"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#fafaf6] flex flex-col justify-center items-center px-8 py-14 text-center">
          <div className="font-script italic text-[#3a3a3a] text-[24px] md:text-[30px] leading-snug max-w-[320px]">
            Now booking select destination weddings across India, Bali, Europe and beyond
          </div>
          <div className="mt-8 flex flex-col gap-3 w-[220px]">
            <button className="btn-outline-thin">Book With Us</button>
            <button className="btn-outline-thin">Destination Weddings</button>
          </div>
        </div>
        <div className="img-zoom h-[260px] md:h-auto">
          <img
            src={destinationImages.right}
            alt="Makeup artist with bride"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Destination;
