import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

function PhotoGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photos = [
    {
      src: "https://i.ibb.co/TvcDPkv/IMG-20191021-WA0018.jpg",
      width: 4,
      height: 3
    },
    {
      src: "https://i.ibb.co/HXWcF7z/IMG-20191104-WA0009.jpg",
      width: 4,
      height: 2
    },

    {
      src: "https://i.ibb.co/YTcHrJ5/IMG-20191104-WA0014.jpg",
      width: 4,
      height: 2
    },
    {
      src: "https://i.ibb.co/LRYJRxb/IMG-20191014-WA0086.jpg",
      width: 4,
      height: 2
    },
    {
      src: "https://i.ibb.co/MSHDSr4/IMG-20191014-WA0087.jpg",
      width: 4,
      height: 2
    },
    {
      src: "https://i.ibb.co/9cv7x1Z/IMG-20191119-WA0012.jpg",
      width: 4,
      height: 2
    }
  ];

  return (
    <div className="sidebar-exit">
      <h2 className="text-center mb-3">Gallery</h2>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
export default PhotoGallery;
