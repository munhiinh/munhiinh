import { recentPlaceSlider } from "@/src/sliderProps";
import Link from "next/link";
import { Component } from "react";
import Slider from "react-slick";

export default class RelatedTours extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    return (
      <div className="related-tour-place wow fadeInUp">
        <div className="row">
          <div className="col-md-8">
            <div className="section-title mb-35">
              <h3>Related bus</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="place-arrows mb-35">
              <div className="prev slick-arrow" onClick={this.previous}>
                <i className="far fa-arrow-left" />
              </div>
              <div className="next slick-arrow" onClick={this.next}>
                <i className="far fa-arrow-right" />
              </div>
            </div>
          </div>
        </div>
        <Slider
          {...recentPlaceSlider}
          ref={(c) => (this.slider = c)}
          className="recent-place-slider"
        >
          {/*=== Single Place Item ===*/}
          <div className="single-place-item mb-60">
            <div className="place-img">
              <img
                src="assets/images/hero/bus2.png"
                alt="Place Image"
                className=" bg-info-subtle"
              />
            </div>
            <div className="place-content">
              <div className="info">
                <ul className="ratings">
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <a href="#">(4.9)</a>
                  </li>
                </ul>
                <h4 className="title">
                  <Link legacyBehavior href="/bus-details">
                    <a>Man and Woman Walks on Dock</a>
                  </Link>
                </h4>
                <p className="location fw-normal">
                  <i className="fas fa-tv" />
                  television
                </p>

                <p className="location fw-normal">
                  <i className="fas fa-wifi" />
                  Free wifi
                </p>
                <p className="location fw-normal ">
                  <i className="fas fa-microphone fs-5 " />
                  Karaoke
                </p>
                <div className="meta">
                  <span>
                    <i className="far fa-clock" />
                    05 Days
                  </span>
                  <span>
                    <i className="far fa-user" />
                    25
                  </span>
                  <span>
                    <Link legacyBehavior href="/tour-details">
                      <a>
                        Details
                        <i className="far fa-long-arrow-right" />
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*=== Single Place Item ===*/}
          <div className="single-place-item mb-60">
            <div className="place-img">
              <img
                src="assets/images/hero/bus2.png"
                alt="Place Image"
                className=" bg-info-subtle"
              />
            </div>
            <div className="place-content">
              <div className="info">
                <ul className="ratings">
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <a href="#">(4.9)</a>
                  </li>
                </ul>
                <h4 className="title">
                  <Link legacyBehavior href="/bus-details">
                    <a>Man and Woman Walks on Dock</a>
                  </Link>
                </h4>
                <p className="location fw-normal">
                  <i className="fas fa-tv" />
                  television
                </p>

                <p className="location fw-normal">
                  <i className="fas fa-wifi" />
                  Free wifi
                </p>
                <p className="location fw-normal ">
                  <i className="fas fa-microphone fs-5 " />
                  Karaoke
                </p>
                <div className="meta">
                  <span>
                    <i className="far fa-clock" />
                    05 Days
                  </span>
                  <span>
                    <i className="far fa-user" />
                    25
                  </span>
                  <span>
                    <Link legacyBehavior href="/tour-details">
                      <a>
                        Details
                        <i className="far fa-long-arrow-right" />
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*=== Single Place Item ===*/}
          <div className="single-place-item mb-60">
            <div className="place-img">
              <img
                src="assets/images/hero/bus2.png"
                alt="Place Image"
                className=" bg-info-subtle"
              />
            </div>
            <div className="place-content">
              <div className="info">
                <ul className="ratings">
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <a href="#">(4.9)</a>
                  </li>
                </ul>
                <h4 className="title">
                  <Link legacyBehavior href="/bus-details">
                    <a>Man and Woman Walks on Dock</a>
                  </Link>
                </h4>
                <p className="location fw-normal">
                  <i className="fas fa-tv" />
                  television
                </p>

                <p className="location fw-normal">
                  <i className="fas fa-wifi" />
                  Free wifi
                </p>
                <p className="location fw-normal ">
                  <i className="fas fa-microphone fs-5 " />
                  Karaoke
                </p>
                <div className="meta">
                  <span>
                    <i className="far fa-clock" />
                    05 Days
                  </span>
                  <span>
                    <i className="far fa-user" />
                    25
                  </span>
                  <span>
                    <Link legacyBehavior href="/tour-details">
                      <a>
                        Details
                        <i className="far fa-long-arrow-right" />
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
