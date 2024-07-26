import React from "react";

function CarrouselLotions({ images }: { images: string[] }) {
  console.log(images);

  return (
    <>
      <div className="p-2 mb-2">
        {images.map((image, index) => (
          <img src={image} className="rounded-sm" key={index} alt="img" />
        ))}
      </div>
    </>
  );
}

export default CarrouselLotions;
