import Slider from "react-slick";
import { sliderActive5Item } from "../sliderProps";
const GallerySection = () => {
  return (
    <section className="gallery-section mbm-150">
      <div className="container-fluid">
        <Slider
          {...sliderActive5Item}
          className="slider-active-5-item wow fadeInUp"
        >
          {/*=== Single Gallery Item ===*/}
          <div className="single-gallery-item">
            <div className="gallery-img">
              <img src="assets/images/gallery/gall2.jfif" alt="Gallery Image" />
              <div className="hover-overlay">
                <a
                  href="assets/images/gallery/gall2.jfif"
                  className="icon-btn img-popup"
                >
                  <i className="far fa-plus" />
                </a>
              </div>
            </div>
          </div>
          {/*=== Single Gallery Item ===*/}
          <div className="single-gallery-item">
            <div className="gallery-img">
              <img src="assets/images/gallery/gall3.jfif" alt="Gallery Image" />
              <div className="hover-overlay">
                <a
                  href="assets/images/gallery/gall3.jfif"
                  className="icon-btn img-popup"
                >
                  <i className="far fa-plus" />
                </a>
              </div>
            </div>
          </div>
          {/*=== Single Gallery Item ===*/}
          <div className="single-gallery-item">
            <div className="gallery-img">
              <img src="assets/images/gallery/gall4.jfif" alt="Gallery Image" />
              <div className="hover-overlay">
                <a
                  href="assets/images/gallery/gall4.jfif"
                  className="icon-btn img-popup"
                >
                  <i className="far fa-plus" />
                </a>
              </div>
            </div>
          </div>
          {/*=== Single Gallery Item ===*/}
          <div className="single-gallery-item">
            <div className="gallery-img">
              <img src="assets/images/gallery/gall5.jfif" alt="Gallery Image" />
              <div className="hover-overlay">
                <a
                  href="assets/images/gallery/gall5.jfif"
                  className="icon-btn img-popup"
                >
                  <i className="far fa-plus" />
                </a>
              </div>
            </div>
          </div>
          {/*=== Single Gallery Item ===*/}
          <div className="single-gallery-item">
            <div className="gallery-img">
              <img src="assets/images/gallery/gall6.jfif" alt="Gallery Image" />
              <div className="hover-overlay">
                <a
                  href="assets/images/gallery/gall6.jfif"
                  className="icon-btn img-popup"
                >
                  <i className="far fa-plus" />
                </a>
              </div>
            </div>
          </div>
          {/*=== Single Gallery Item ===*/}
          <div className="single-gallery-item">
            <div className="gallery-img">
              <img src="assets/images/gallery/gall1.jfif" alt="Gallery Image" />
              <div className="hover-overlay">
                <a
                  href="assets/images/gallery/gall1.jfif"
                  className="icon-btn img-popup"
                >
                  <i className="far fa-plus" />
                </a>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};
export default GallerySection;
