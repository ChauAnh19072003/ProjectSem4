import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Why = ({ testimonials, itemWidth }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    const whyElement = document.getElementById("why");
    if (whyElement) {
      const rect = whyElement.getBoundingClientRect();
      setScrolling(
        rect.top <= window.innerHeight * 0.2 &&
          rect.bottom >= window.innerHeight * 0.2
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const prev = () => {
    let newIndex =
      (activeIndex - 1 + testimonials.length) % testimonials.length;
    if (newIndex === testimonials.length - 1) {
      newIndex = testimonials.length - 4;
    }
    setActiveIndex(newIndex);
  };

  const next = () => {
    let newIndex = (activeIndex + 1) % testimonials.length;
    if (newIndex === testimonials.length - 3) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  const marginLeft = -activeIndex * itemWidth;
  return (
    <div>
      <div className="why">
        <div className="container circle green">
          <div className="row">
            <div className="col-12">
              <h2 className=" why__title text-center">
                Why people <b> use PROJECT</b>
                <span onClick={prev} className="why__prev">
                  prev
                </span>
                <span onClick={next} className="why__next">
                  next
                </span>
              </h2>

              <div
                className="why__slider-wrapper"
                style={{
                  touchAction: "pan-y",
                  userSelect: "none",
                  WebkitUserDrag: "none",
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                }}
              >
                <div
                  className="row why__slider-row"
                  style={{
                    marginLeft: `${marginLeft}px`,
                    width: `${testimonials.length * itemWidth}px`,
                    transition: "all 1000ms ease 0s",
                    padding: "0px",
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      className="col-12 col-md-6 col-lg-4 slider-item"
                      style={{ maxWidth: `${itemWidth}px` }}
                    >
                      <div key={index} className="card why__slider-card">
                        <div className="card__title"></div>
                        <div className="card__body">
                          <p>{testimonial.text}</p>
                          <div className="card__author">
                            <strong>{testimonial.author}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className="col-12">
                    <ul className="slider__navigation why__slider-navigation">
                      {testimonials.map((_, index) => (
                        <li
                          key={index}
                          className={index === activeIndex ? "is-active" : ""}
                        ></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrote-news">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2
                className={`js-text-animation ${
                  scrolling ? "js-fadeInUp" : ""
                }`}
              >
                <b>They wrote about us</b>
              </h2>
            </div>
            <div className="col-12">
              <div className="wrote-news__wrapper">
                <div
                  className={`wrote-news__item js-text-animation ${
                    scrolling ? "js-fadeInUp" : ""
                  }`}
                >
                  <svg
                    width="190"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M156.09 31.827c-5.528-.966-10.115-4.644-12.194-9.777-1.071-2.644-1.434-7.176-.792-9.896.914-3.873 3.373-7.415 6.571-9.467C152.514.867 154.76.352 160.7.167L166.02 0v11.137l-2.046-.834c-1.344-.547-2.889-.88-4.502-.97-2.292-.128-2.558-.071-3.995.854-2.06 1.326-3.01 3.153-3.03 5.825-.012 1.732.127 2.217.981 3.433 1.327 1.887 3.134 2.884 5.226 2.884 2.172.001 2.524-.266 2.396-1.822l-.104-1.276-2.538.016-2.537.017V12.03l6.875.094 6.876.095v6.647c0 4.04.144 7.058.365 7.694.459 1.316.029 1.85-2.63 3.266-3.204 1.707-8.036 2.565-11.267 2zM5.464 30.604c.152-.315.323-5.338.38-11.161l.101-10.588-2.972.115L0 9.085l.09-4.418L.181.249 7.794.16l7.612-.088v31.104h-5.11c-4.754 0-5.09-.04-4.832-.573zM17.37 15.63V.085h13.424V9.14l-1.8-.15-1.801-.149v3.354h5.566V.085h9.823v31.092H32.12l.32-.84c.176-.462.32-3.039.32-5.727v-4.888h-5.598l.1 5.155c.054 2.834.224 5.412.377 5.727.26.533-.084.573-4.995.573h-5.274V15.63zm26.563 15.005c.683-.822.84-27.265.174-29.198L43.64.085h18.914v9.068l-1.719-.45c-.97-.254-2.86-.412-4.338-.362l-2.62.09-.099 1.923-.1 1.924 2.801-.146 2.801-.147v7.658l-1.449-.31c-.796-.17-2.012-.262-2.701-.205l-1.252.103-.1 1.754-.101 1.754 3.702-.162c2.036-.088 4.033-.27 4.439-.401l.736-.24v9.24H53.02c-8.83 0-9.502-.04-9.086-.54zm37.176-.523c-4.53-10.835-12.327-28.395-12.92-29.1l-.782-.928h10.998c6.049 0 10.998.11 10.997.246 0 .134-.643 1.939-1.428 4.009L86.55 8.103l-2.502.096c-1.375.052-2.501.151-2.501.219 0 .31 3.067 8.551 3.267 8.778.124.141 1.671-3.65 3.438-8.427L91.463.085h25.444v4.78c0 4.436-.04 4.762-.573 4.517-.315-.145-2.304-.32-4.42-.389l-3.847-.126v3.41l2.783-.146 2.783-.146v7.658l-1.449-.31c-.796-.17-2.012-.262-2.7-.205l-1.253.103-.098 1.882-.099 1.882h2.922c1.76 0 3.475-.196 4.314-.491.766-.27 1.448-.491 1.515-.491.067 0 .122 2.062.122 4.582v4.582h-9.535c-7.811 0-9.471-.078-9.18-.428.39-.47.71-23.137.326-23.137-.12 0-2.473 5.302-5.23 11.783l-5.014 11.782h-6.72l-.444-1.064zM117.854.007l5.999.01c8.806.004 11.72.657 14.28 3.224 3.146 3.154 3.573 9.23.9 12.863l-.798 1.078 1.403 1.078c2.114 1.618 3.444 4.394 4.186 8.757.337 1.98.687 3.737.789 3.9.107.175-2.14.299-5.416.299h-5.6l.38-.699c.586-1.1.186-3.712-.8-5.205-.872-1.323-2.675-2.712-4.053-3.12-.736-.219-.737-.212-.737 3.767 0 2.192.151 4.27.338 4.62.33.617.168.637-5.282.637-5.237 0-5.596-.04-5.334-.575.359-.734.368-28.908.01-29.895l-.265-.74zm11.25 8.223c-.694-.043-.717.688-.717 2.946v2.957h1.003c.678 0 1.323-.31 1.966-.955 1.516-1.52 1.122-3.658-.83-4.476-.65-.273-1.107-.452-1.422-.472zm41.747 22.415c.36-.736.37-28.91.012-29.9l-.27-.745 9.442.087 9.441.088.091 4.542.092 4.542-.747-.24c-1.815-.584-3.208-.78-5.578-.788l-2.539-.007v4.024l2.785-.146 2.784-.147v3.919c0 3.598-.047 3.9-.573 3.695-.316-.123-1.553-.306-2.75-.408l-2.177-.185-.116 1.729c-.081 1.208.012 1.779.311 1.894.556.214 6.885-.13 7.843-.426l.738-.227v9.274h-9.535c-8.97 0-9.518-.035-9.254-.575z"
                      fill="#6C767F"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
                <div
                  className={`wrote-news__item js-text-animation ${
                    scrolling ? "js-fadeInUp" : ""
                  }`}
                >
                  <svg
                    width="125"
                    height="39"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40.1688864,27.4832368 C40.1688864,24.8342368 42.5310494,23.3943947 45.3555039,23.3943947 C47.0859275,23.3943947 48.6629493,23.8344474 49.8952985,24.6152368 L49.8952985,27.2415 C48.6143293,26.2829211 47.2125321,25.6230789 45.4103819,25.6230789 C43.8591945,25.6230789 42.700016,26.2091842 42.700016,27.4306579 C42.700016,28.5357632 43.4281932,28.9766053 44.7090019,29.4206053 L47.1892651,30.3016579 C49.592025,31.1561842 50.6955231,32.4832895 50.6955231,34.6638158 C50.6955231,37.4083421 48.3102535,38.9238158 45.1799583,38.9238158 C43.1244384,38.9238158 41.3749198,38.3416579 40.2987003,37.6068158 L40.2987003,34.9301842 C41.6980905,36.0338684 43.3794127,36.6712895 45.1799583,36.6712895 C46.9342908,36.6712895 48.1661585,36.0602368 48.1661585,34.7102368 C48.1661585,33.5345526 47.3814987,33.0730263 46.0056964,32.5570263 L43.7802471,31.7733947 C41.7280969,31.0363421 40.1688864,29.9590263 40.1688864,27.4832368 Z M57.4577985,38.694 L57.4577985,23.6507368 L60.0683569,23.6507368 L60.0683569,38.694 L57.4577985,38.694 Z M10.4035623,38.6935263 L10.4035623,23.6507368 L13.0171694,23.6507368 L13.0171694,38.6935263 L10.4035623,38.6935263 Z M67.70138,23.6505947 L73.5978819,23.6505947 C78.1367137,23.6505947 81.0712452,26.5899632 81.0712452,31.1681211 C81.0712452,35.7522789 78.1367137,38.6933842 73.5978819,38.6933842 L67.70138,38.6933842 L67.70138,23.6505947 Z M70.3074454,25.9039105 L70.3074454,36.4173316 L73.5001605,36.4173316 C76.7289795,36.4173316 78.4558729,34.3812789 78.4558729,31.1681211 C78.4558729,27.9320684 76.7289795,25.9039105 73.5001605,25.9039105 L70.3074454,25.9039105 Z M86.5874198,23.6505158 L95.9129974,23.6505158 L95.9129974,25.9033579 L89.1421374,25.9033579 L89.1421374,29.5232526 L95.2148267,29.5232526 L95.2148267,31.7506737 L89.1421374,31.7506737 L89.1421374,36.4172526 L95.9129974,36.4172526 L95.9129974,38.6933053 L86.5874198,38.6933053 L86.5874198,23.6505158 Z M103.712677,23.6505947 L109.288094,23.6505947 C112.46749,23.6505947 114.523331,25.2150158 114.523331,28.1602263 C114.523331,30.6784895 113.382445,32.1249632 110.95016,32.4952263 L116.482574,38.6930684 L113.522368,38.6930684 L108.166303,32.5899632 L106.314249,32.5899632 L106.314249,38.6930684 L103.712677,38.6930684 L103.712677,23.6505947 Z M106.314249,25.8573316 L106.314249,30.4626474 L109.23819,30.4626474 C110.969416,30.4626474 111.945507,29.5544368 111.945507,28.1602263 C111.945507,26.7650684 110.969416,25.8573316 109.23819,25.8573316 L106.314249,25.8573316 Z M35.3055039,4.32576316 C35.3055039,1.63681579 37.6792202,0.167921053 40.5331996,0.167921053 C42.2756579,0.167921053 43.8668004,0.616342105 45.1039634,1.41307895 L45.1039634,4.07660526 C43.8159339,3.10523684 42.4022625,2.43402632 40.5840661,2.43402632 C39.0181162,2.43402632 37.8562099,3.03102632 37.8562099,4.27618421 C37.8562099,5.39628947 38.5887195,5.84455263 39.8769095,6.2925 L42.376749,7.18886842 C44.8013318,8.06060526 45.9123716,9.40444737 45.9123716,11.6203421 C45.9123716,14.4084474 43.5136232,15.9518684 40.3562099,15.9518684 C38.2856065,15.9518684 36.5177953,15.3543947 35.4325899,14.6072368 L35.4325899,11.8941316 C36.8459403,13.0142368 38.5380135,13.6612895 40.3562099,13.6612895 C42.1245026,13.6612895 43.3611842,13.0391842 43.3611842,11.6694474 C43.3611842,10.4748158 42.5787709,10.0019211 41.1898107,9.47897368 L38.942378,8.68271053 C36.8712933,7.93555263 35.3055039,6.84055263 35.3055039,4.32576316 Z M114.233135,4.31565789 C114.233135,1.62671053 116.606852,0.157815789 119.460831,0.157815789 C121.203289,0.157815789 122.793951,0.605763158 124.031595,1.40297368 L124.031595,4.0665 C122.743726,3.09560526 121.329413,2.42344737 119.510254,2.42344737 C117.945748,2.42344737 116.783841,3.02092105 116.783841,4.26560526 C116.783841,5.38618421 117.51587,5.83413158 118.80406,6.28255263 L121.303899,7.17828947 C123.728001,8.04955263 124.839682,9.39434211 124.839682,11.6099211 C124.839682,14.3978684 122.440453,15.9417632 119.283841,15.9417632 C117.212275,15.9417632 115.445427,15.3438158 114.359259,14.5971316 L114.359259,11.8835526 C115.773572,13.0041316 117.465645,13.6511842 119.283841,13.6511842 C121.051653,13.6511842 122.288816,13.0286053 122.288816,11.6595 C122.288816,10.4651842 121.505921,9.99134211 120.117121,9.46886842 L117.869528,8.67260526 C115.798925,7.92544737 114.233135,6.8295 114.233135,4.31565789 Z M98.3713575,4.31565789 C98.3713575,1.62671053 100.745555,0.157815789 103.599856,0.157815789 C105.341512,0.157815789 106.932654,0.605763158 108.170298,1.40297368 L108.170298,4.0665 C106.882269,3.09560526 105.468116,2.42344737 103.648957,2.42344737 C102.08397,2.42344737 100.923026,3.02092105 100.923026,4.26560526 C100.923026,5.38618421 101.654573,5.83413158 102.942282,6.28255263 L105.442603,7.17828947 C107.866223,8.04955263 108.978225,9.39434211 108.978225,11.6099211 C108.978225,14.3978684 106.579156,15.9417632 103.422545,15.9417632 C101.35146,15.9417632 99.5831675,15.3438158 98.4979621,14.5971316 L98.4979621,11.8835526 C99.9122754,13.0041316 101.604188,13.6511842 103.422545,13.6511842 C105.189393,13.6511842 106.427519,13.0286053 106.427519,11.6595 C106.427519,10.4651842 105.644625,9.99134211 104.255664,9.46886842 L102.008232,8.67260526 C99.937147,7.92544737 98.3713575,6.8295 98.3713575,4.31565789 Z M82.9906611,0.417252632 L92.3831515,0.417252632 L92.3831515,2.70656842 L85.5641528,2.70656842 L85.5641528,6.38472632 L91.6800064,6.38472632 L91.6800064,8.64814737 L85.5641528,8.64814737 L85.5641528,13.3903579 L92.3831515,13.3903579 L92.3831515,15.7027263 L82.9906611,15.7027263 L82.9906611,0.417252632 Z M-8.02310658e-05,0.417173684 L5.42915597,0.417173684 C8.66198652,0.417173684 10.6822047,1.83648947 10.6822047,4.57454211 C10.6822047,6.21743684 9.79853979,7.41254211 8.66198652,7.81138421 C10.1271662,8.28427895 11.1873395,9.70327895 11.1873395,11.3217 C11.1873395,14.1841737 9.16712131,15.7031211 5.93477214,15.7031211 L-8.02310658e-05,15.7031211 L-8.02310658e-05,0.417173684 Z M2.5506258,2.65864737 L2.5506258,6.84048947 L5.40412388,6.84048947 C7.19744865,6.84048947 8.15733312,6.16785789 8.15733312,4.72406842 C8.15733312,3.28027895 7.19744865,2.65864737 5.40412388,2.65864737 L2.5506258,2.65864737 Z M2.5506258,8.98106842 L2.5506258,13.4621211 L5.88390565,13.4621211 C7.65219833,13.4621211 8.61128049,12.5908579 8.61128049,11.2215947 C8.61128049,9.82785789 7.65219833,8.98106842 5.88390565,8.98106842 L2.5506258,8.98106842 Z M52.6707317,15.7026316 L52.6707317,0.416684211 L55.2968549,0.416684211 L55.2968549,15.7026316 L52.6707317,15.7026316 Z M26.6211168,0.416778947 L29.2477214,0.416778947 L29.2477214,9.62804211 C29.2477214,13.8105158 26.7472401,15.9518842 23.0351091,15.9518842 C19.3478498,15.9518842 16.8224968,13.8105158 16.8224968,9.60404211 L16.8224968,0.416778947 L19.4491014,0.416778947 L19.4491014,9.32930526 C19.4491014,12.2670947 20.7117779,13.6363579 23.0351091,13.6363579 C25.3584403,13.6363579 26.6211168,12.2670947 26.6211168,9.32930526 L26.6211168,0.416778947 Z M73.4487163,0.416715789 L75.9718228,0.416715789 L75.9718228,15.9409263 L65.3203466,5.75987368 L65.3203466,15.7028211 L62.7900193,15.7028211 L62.7900193,0.178926316 L73.4487163,10.1900842 L73.4487163,0.416715789 Z M20.5014602,38.6921526 L20.5014602,23.4171 L31.0812099,33.2665737 L31.0812099,23.6496789 L33.5863447,23.6496789 L33.5863447,38.9252053 L23.0130135,28.9082053 L23.0130135,38.6921526 L20.5014602,38.6921526 Z"
                      fill="#6C767F"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
                <div
                  className={`wrote-news__item js-text-animation ${
                    scrolling ? "js-fadeInUp" : ""
                  }`}
                >
                  <svg
                    width="359"
                    height="31"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M356.667929,26.5559868 C355.625951,26.5559868 354.757551,27.4237829 354.757551,28.5949303 C354.757551,29.7650987 355.625951,30.6328947 356.667929,30.6328947 C357.709397,30.6328947 358.578308,29.7650987 358.578308,28.5949303 C358.578308,27.4237829 357.709397,26.5559868 356.667929,26.5559868 Z M287.543582,30.5023684 L296.313862,30.5023684 L296.313862,29.7217395 L295.359694,29.5050658 C294.490784,29.2878618 294.099212,28.8111145 294.099212,27.5966079 L294.099212,15.8023316 L296.140795,15.8023316 C297.399745,15.8023316 298.051173,16.1057237 298.137452,18.7509211 L298.354935,24.3013487 C298.528513,29.2878618 299.961551,30.6762132 302.393685,30.6762132 C304.868191,30.6762132 305.519619,28.9844697 305.519619,26.5998355 L305.519619,25.6020434 L304.606803,25.6020434 L304.606803,26.3387829 C304.606803,27.9443382 304.390852,29.0711474 303.782308,29.0711474 C303.21818,29.0711474 303.174275,28.6377592 303.044091,26.6431539 L302.784235,22.8272987 C302.436569,17.7102592 301.785141,15.9323684 298.007268,15.2379276 C301.611563,14.2844737 303.825703,11.6387461 303.825703,7.86625 C303.825703,2.96588421 299.961551,0.624078947 296.270978,0.624078947 L281.465292,0.624078947 L281.465292,1.40519737 L282.289787,1.57802237 C283.853009,1.92526316 283.896914,2.74921053 283.896914,6.26220395 L283.896914,23.5207197 C283.896914,27.3804237 282.81052,29.2445026 280.334993,29.2445026 C278.121874,29.2445026 276.905808,28.1605224 276.905808,23.9541079 L276.905808,3.44312105 C276.905808,2.22861447 277.295848,1.88243421 278.251037,1.66523026 L279.423709,1.40519737 L279.423709,0.624078947 L270.349667,0.624078947 L270.349667,1.40519737 L271.303835,1.66523026 C272.172746,1.92526316 272.476507,2.27246316 272.476507,3.48648026 L272.476507,23.6507566 C272.476507,28.2038816 275.125613,30.7190421 279.163852,30.7190421 C283.201581,30.7190421 285.198238,28.2038816 285.198238,23.5207197 L285.198238,4.70045658 C285.198238,2.35914079 285.677109,1.53519342 287.586466,1.53519342 C289.106294,1.53519342 289.758232,2.05578947 289.758232,3.48648026 L289.758232,27.5966079 C289.758232,28.8111145 289.367682,29.2445026 288.498771,29.4617066 L287.543582,29.7217395 L287.543582,30.5023684 Z M345.812672,3.48648026 C345.812672,2.27246316 346.204243,1.88243421 347.071623,1.70854868 L348.244295,1.44802632 L348.244295,0.624078947 L339.213137,0.624078947 L339.213137,1.40519737 L340.168326,1.66523026 C341.037237,1.92526316 341.427277,2.27246316 341.427277,3.48648026 L341.427277,27.7709829 C341.427277,28.9411513 340.950448,29.5917434 339.603177,29.5917434 C338.040465,29.5917434 337.822982,29.0711474 337.259364,26.5131579 L331.701807,0.537890789 L329.964497,0.537890789 L324.668328,25.6886803 C324.059273,28.5072329 323.755512,29.1583553 322.58284,29.5050658 L321.844623,29.7217395 L321.844623,30.5023684 L328.054118,30.5023684 L328.054118,29.7217395 L327.142324,29.5483842 C325.839468,29.2878618 325.492823,28.5949303 326.144251,25.2986513 L329.270185,9.21026316 L332.699881,26.2525947 C333.221125,28.7244368 333.178241,29.2016737 331.310747,29.5483842 L330.398952,29.7217395 L330.398952,30.5023684 L353.411301,30.5023684 L353.411301,20.6154895 L352.586296,20.6154895 C352.152351,25.1686553 351.241067,29.4617066 347.549983,29.4617066 L345.812672,29.4617066 L345.812672,3.48648026 Z M332.265936,22.4367803 L332.265936,21.2660816 L326.404107,21.2660816 L326.23104,22.4367803 L332.265936,22.4367803 Z M308.03752,4.00703553 L308.03752,24.7347368 C308.03752,27.8571711 308.03752,29.3317105 306.474808,29.5917434 L305.693197,29.7217395 L305.693197,30.5023684 L312.075249,30.5023684 L312.075249,29.7217395 C309.296981,29.3317105 309.296981,28.3777263 309.296981,24.9952592 L309.296981,5.30821974 L308.255003,4.35374605 L318.892777,30.5023684 L320.715856,30.5023684 L320.715856,6.3922 C320.715856,2.83641842 320.715856,2.05578947 322.453167,1.57802237 L323.0612,1.40519737 L323.0612,0.624078947 L316.504039,0.624078947 L316.504039,1.40519737 L317.242255,1.57802237 C319.456906,1.96858158 319.456906,2.83641842 319.456906,6.13167763 L319.456906,21.2222329 L319.891361,21.0922368 L311.815392,0.624078947 L305.605897,0.624078947 L305.605897,1.40519737 L306.213931,1.57802237 C306.909263,1.79522632 307.299814,2.57585526 308.03752,4.00703553 Z M294.099212,1.66523026 L295.837034,1.66523026 C297.573323,1.66523026 299.17994,2.79252895 299.17994,8.43016447 C299.17994,14.1972658 297.964895,14.7611803 295.533272,14.7611803 L294.099212,14.7611803 L294.099212,1.66523026 Z M265.182661,15.2817763 C265.182661,27.8133224 264.140683,29.5917434 261.882127,29.5917434 C259.624593,29.5917434 258.62601,27.8133224 258.62601,15.3679237 C258.62601,3.313125 259.711893,1.57802237 261.882127,1.57802237 C264.140683,1.57802237 265.182661,3.313125 265.182661,15.2817763 Z M269.915722,15.5418092 C269.915722,7.25897632 267.266617,0.407894737 261.882127,0.407894737 C256.455265,0.407894737 253.892948,7.25897632 253.892948,15.5418092 C253.892948,23.8679605 256.541543,30.7190421 261.882127,30.7190421 C267.3968,30.7190421 269.915722,23.8679605 269.915722,15.5418092 Z M251.332163,3.48648026 C251.332163,2.27246316 251.635924,1.88243421 252.503303,1.66523026 L253.458493,1.40519737 L253.458493,0.624078947 L244.47124,0.624078947 L244.47124,1.40519737 L245.556102,1.66523026 C246.424502,1.88243421 246.902863,2.18578553 246.902863,3.44312105 L246.902863,24.3013487 C246.902863,27.2065789 246.641985,29.5483842 244.47124,29.5483842 C243.081596,29.5483842 242.039617,28.4639145 242.083522,27.6838158 C242.212685,26.3387829 244.47124,26.4264803 244.644818,24.2575 C244.775001,22.6967724 243.775907,22.0461803 242.864623,21.9166737 C241.518373,21.7428289 239.869383,22.8701276 239.824967,25.1252961 C239.781062,28.0305263 241.691951,30.6762132 244.948579,30.6762132 C248.552874,30.6762132 251.332163,28.2477303 251.332163,23.6069079 L251.332163,3.48648026 Z M106.308824,3.48648026 C106.308824,2.27246316 106.699885,1.88243421 107.568285,1.70854868 L108.740447,1.44802632 L108.740447,0.624078947 L99.709289,0.624078947 L99.709289,1.40519737 L100.664478,1.66523026 C101.532878,1.92526316 101.923939,2.27246316 101.923939,3.48648026 L101.923939,27.7709829 C101.923939,28.9411513 101.445579,29.5917434 100.099839,29.5917434 C98.5366169,29.5917434 98.27625,29.0711474 97.7121217,26.5131579 L92.1540543,0.537890789 L90.4177645,0.537890789 L85.120064,25.6886803 C84.5125412,28.5072329 84.2082693,29.1583553 83.0361078,29.5050658 L82.2978911,29.7217395 L82.2978911,30.5023684 L88.5068757,30.5023684 L88.5068757,29.7217395 L87.5950811,29.5483842 C86.2927361,29.2878618 85.9450697,28.5949303 86.5964974,25.2986513 L89.7229423,9.12358553 L93.1531485,26.2525947 C93.6304878,28.7244368 93.6304878,29.2016737 91.763504,29.5483842 L90.8517093,29.7217395 L90.8517093,30.5023684 L113.907964,30.5023684 L113.907964,20.6154895 L113.082958,20.6154895 C112.648503,25.1686553 111.736708,29.4617066 108.046135,29.4617066 L106.308824,29.4617066 L106.308824,3.48648026 Z M227.189515,1.66523026 L228.145215,1.66523026 C230.837715,1.66523026 231.749509,5.95779211 232.053271,10.5114474 L232.877766,10.5114474 L232.877766,0.624078947 L217.116379,0.624078947 L217.116379,10.5114474 L217.941385,10.5114474 C218.245657,5.95779211 219.157452,1.66523026 221.849441,1.66523026 L222.80463,1.66523026 L222.80463,27.5966079 C222.80463,28.8111145 222.41408,29.2445026 221.54568,29.4617066 L220.416913,29.7217395 L220.416913,30.5023684 L229.795737,30.5023684 L229.795737,29.7217395 L228.448976,29.4183882 C227.62397,29.2016737 227.189515,28.9411513 227.189515,27.5966079 L227.189515,1.66523026 Z M207.347005,15.4979605 L208.692745,15.5418092 C210.647028,15.5851276 211.210646,16.3224382 211.602728,21.0494079 L212.427223,21.0494079 L212.427223,8.99407895 L211.602728,8.99407895 C211.124367,12.766575 210.603123,14.3706211 208.73665,14.4144697 L207.347005,14.4578289 L207.347005,1.66523026 L210.343266,1.66523026 C213.686684,1.66523026 214.4249,5.87164474 214.90224,10.5114474 L215.727245,10.5114474 L215.727245,0.624078947 L200.74747,0.624078947 L200.74747,1.40519737 L201.702659,1.66523026 C202.700732,1.92526316 202.96161,2.53302632 202.96161,3.52979868 L202.96161,27.5966079 C202.96161,28.8111145 202.57157,29.2445026 201.702659,29.4617066 L200.74747,29.7217395 L200.74747,30.5023684 L216.16119,30.5023684 L216.16119,20.6154895 L215.336185,20.6154895 C214.81494,25.1252961 214.250812,29.4617066 210.343266,29.4617066 L207.347005,29.4617066 L207.347005,15.4979605 Z M190.977585,15.4979605 L192.323835,15.5418092 C194.277608,15.5851276 194.842247,16.3224382 195.232797,21.0494079 L196.057803,21.0494079 L196.057803,8.99407895 L195.232797,8.99407895 C194.755458,12.766575 194.234214,14.3706211 192.36774,14.4144697 L190.977585,14.4578289 L190.977585,1.66523026 L193.973847,1.66523026 C197.317264,1.66523026 198.055481,5.95779211 198.53282,10.5114474 L199.357826,10.5114474 L199.357826,0.624078947 L183.944106,0.624078947 L183.944106,1.40519737 L185.333239,1.66523026 C186.331823,1.92526316 186.592701,2.53302632 186.592701,3.52979868 L186.592701,27.5966079 C186.592701,28.8111145 186.20164,29.2445026 185.333239,29.4617066 L184.37805,29.7217395 L184.37805,30.5023684 L199.79177,30.5023684 L199.79177,20.6154895 L198.967275,20.6154895 C198.446031,25.1252961 197.881392,29.4617066 193.973847,29.4617066 L190.977585,29.4617066 L190.977585,15.4979605 Z M173.132243,1.66523026 L174.435098,1.66523026 C176.171388,1.66523026 177.778005,2.79252895 177.778005,8.43016447 C177.778005,14.1105882 176.562959,14.7611803 174.131337,14.7611803 L173.132243,14.7611803 L173.132243,1.66523026 Z M166.575592,30.5023684 L175.346893,30.5023684 L175.346893,29.7217395 L174.391193,29.5050658 C173.522793,29.2878618 173.132243,28.8111145 173.132243,27.5966079 L173.132243,15.8023316 L174.738859,15.8023316 C175.99781,15.8023316 176.649238,16.3224382 176.736027,18.7509211 L176.952999,24.3013487 C177.127088,29.2878618 178.559616,30.6762132 180.991239,30.6762132 C183.466256,30.6762132 184.117173,28.9844697 184.117173,26.5998355 L184.117173,25.6020434 L183.205378,25.6020434 L183.205378,26.3387829 C183.205378,27.9443382 182.988916,29.0711474 182.380883,29.0711474 C181.816244,29.0711474 181.772339,28.6377592 181.642666,26.6431947 L181.381789,22.8272987 C181.034633,17.5802632 180.339811,15.9323684 176.605843,15.2379276 C180.209627,14.2844737 182.423767,11.6387461 182.423767,7.86625 C182.423767,2.96588421 178.559616,0.624078947 174.869043,0.624078947 L166.575592,0.624078947 L166.575592,1.40519737 L167.530781,1.66523026 C168.399691,1.92526316 168.789731,2.27246316 168.789731,3.48648026 L168.789731,27.5966079 C168.789731,28.8111145 168.399691,29.2445026 167.530781,29.4617066 L166.575592,29.7217395 L166.575592,30.5023684 Z M159.932662,1.66523026 L160.887851,1.66523026 C163.579841,1.66523026 164.491635,5.95779211 164.795907,10.5114474 L165.620402,10.5114474 L165.620402,0.624078947 L149.859016,0.624078947 L149.859016,10.5114474 L150.684022,10.5114474 C150.987783,5.95779211 151.900088,1.66523026 154.592078,1.66523026 L155.547267,1.66523026 L155.547267,27.5966079 C155.547267,28.8111145 155.156206,29.2445026 154.288316,29.4617066 L153.159039,29.7217395 L153.159039,30.5023684 L162.32038,30.5023684 L162.32038,29.7217395 L161.191613,29.4617066 C160.062846,29.2016737 159.932662,28.3344079 159.932662,27.5966079 L159.932662,1.66523026 Z M149.90241,22.7401316 C149.90241,13.8505553 140.133547,11.50875 140.133547,5.04769737 C140.133547,3.660325 140.65428,1.57802237 142.825026,1.57802237 C145.95147,1.57802237 147.123632,5.61161184 147.644876,10.5114474 L148.469882,10.5114474 L148.469882,0.624078947 L147.948638,0.624078947 C147.731665,1.57802237 147.340604,2.01243026 146.776987,2.01243026 C145.777892,2.01243026 145.256648,0.451213158 142.868931,0.451213158 C139.177847,0.451213158 136.659435,3.52979868 136.659435,7.56285789 C136.659435,14.8912171 146.42932,17.9698026 146.42932,24.7347368 C146.42932,27.8133224 144.995771,29.5483842 143.042509,29.5483842 C140.133547,29.5483842 138.222658,26.1230882 137.701924,20.6154895 L136.876918,20.6154895 L136.876918,30.5023684 L137.397652,30.5023684 C137.832108,29.0711474 138.396236,28.9411513 138.873575,28.9411513 C139.699091,28.9411513 140.567491,30.6762132 143.085392,30.6762132 C146.950054,30.6762132 149.90241,27.3371053 149.90241,22.7401316 Z M121.462688,3.48648026 C121.462688,2.27246316 121.853238,1.88243421 122.721638,1.70854868 L123.89431,1.44802632 L123.89431,0.624078947 L114.863153,0.624078947 L114.863153,1.40519737 L115.818342,1.66523026 C116.686232,1.92526316 117.077292,2.27246316 117.077292,3.48648026 L117.077292,27.5966079 C117.077292,28.8111145 116.686232,29.2445026 115.818342,29.4617066 L114.863153,29.7217395 L114.863153,30.5023684 L129.061317,30.5023684 L129.061317,20.6154895 L128.235801,20.6154895 C127.802366,25.1686553 126.890061,29.4617066 123.199488,29.4617066 L121.462688,29.4617066 L121.462688,3.48648026 Z M92.7181826,22.4367803 L92.7181826,21.2660816 L86.8573749,21.2660816 L86.6832864,22.4367803 L92.7181826,22.4367803 Z M67.6218771,30.5890461 L69.402072,30.5890461 L73.4398009,9.25411184 L72.8322782,9.25411184 L77.261068,30.5890461 L78.8242904,30.5890461 L84.1219909,5.43825658 C84.6861192,2.79252895 84.9898805,1.88243421 86.0323692,1.62138158 L86.8573749,1.40519737 L86.8573749,0.624078947 L80.7346687,0.624078947 L80.7346687,1.40519737 L81.6469738,1.57802237 C82.9493188,1.83858553 83.2530802,2.61917368 82.6455575,5.82779605 L79.2153513,22.6967724 L79.7365956,22.6967724 L76.2624844,4.91766053 C75.914818,3.22591711 75.6983561,1.83858553 77.1313951,1.57802237 L78.0860737,1.40519737 L78.0860737,0.624078947 L69.7063439,0.624078947 L69.7063439,1.40519737 L70.2704721,1.53519342 C71.1393828,1.75137763 71.2695663,2.27246316 71.6167221,3.92035789 L72.9624616,10.3814105 L72.7020947,6.47838816 L69.7063439,22.2633842 L70.0968942,22.2633842 L66.579899,4.91766053 C66.1888382,3.13976974 66.0586547,1.79522632 67.4477887,1.53519342 L68.1002375,1.40519737 L68.1002375,0.624078947 L59.5459087,0.624078947 L59.5459087,1.40519737 L60.3709144,1.62138158 C61.1520151,1.83858553 61.5869809,2.22861447 62.1082253,4.61377895 L67.6218771,30.5890461 Z M44.4359499,15.4979605 L45.7816894,15.5418092 C47.7354622,15.5851276 48.300101,16.3224382 48.6906513,21.0494079 L49.515657,21.0494079 L49.515657,8.99407895 L48.6906513,8.99407895 C48.213312,12.766575 47.6925782,14.3706211 45.8250839,14.4144697 L44.4359499,14.4578289 L44.4359499,1.66523026 L47.4317008,1.66523026 C50.7746075,1.66523026 51.5133348,5.95779211 51.9906741,10.5114474 L52.8156797,10.5114474 L52.8156797,0.624078947 L37.8359044,0.624078947 L37.8359044,1.40519737 L38.7916041,1.66523026 C39.7896772,1.92526316 40.0505546,2.53302632 40.0505546,3.52979868 L40.0505546,27.5966079 C40.0505546,28.8111145 39.6594937,29.2445026 38.7916041,29.4617066 L37.8359044,29.7217395 L37.8359044,30.5023684 L53.2501351,30.5023684 L53.2501351,20.6154895 L52.4246189,20.6154895 C51.9043956,25.1252961 51.3397568,29.4617066 47.4317008,29.4617066 L44.4359499,29.4617066 L44.4359499,15.4979605 Z M17.1244838,30.5023684 L26.0254579,30.5023684 L26.0254579,29.7217395 L25.0273848,29.5050658 C24.2452631,29.3317105 23.7245293,28.8111145 23.7245293,27.5966079 L23.7245293,15.7590132 L30.2806698,15.7590132 L30.2806698,27.5966079 C30.2806698,28.8111145 29.759936,29.3317105 28.9783248,29.5050658 L27.9797412,29.7217395 L27.9797412,30.5023684 L36.8807153,30.5023684 L36.8807153,29.7217395 L35.9255262,29.4617066 C35.0576365,29.2445026 34.6660651,28.7672658 34.6660651,27.5537789 L34.6660651,3.48648026 C34.6660651,2.27246316 35.0576365,1.88243421 35.9255262,1.66523026 L36.8807153,1.40519737 L36.8807153,0.624078947 L27.9797412,0.624078947 L27.9797412,1.40519737 L28.9783248,1.66523026 C29.7165415,1.88243421 30.2806698,2.18578553 30.2806698,3.44312105 L30.2806698,14.587825 L23.7245293,14.587825 L23.7245293,3.44312105 C23.7245293,2.22861447 24.2023791,1.88243421 25.0273848,1.66523026 L26.0254579,1.40519737 L26.0254579,0.624078947 L17.1244838,0.624078947 L17.1244838,1.40519737 L18.0796729,1.66523026 C18.9485836,1.92526316 19.339134,2.27246316 19.339134,3.48648026 L19.339134,27.5966079 C19.339134,28.8111145 18.9485836,29.2445026 18.0796729,29.4617066 L17.1244838,29.7217395 L17.1244838,30.5023684 Z M10.4810438,1.66523026 L11.437254,1.66523026 C14.1287329,1.66523026 15.0405276,5.95779211 15.344289,10.5114474 L16.1692947,10.5114474 L16.1692947,0.624078947 L0.408418658,0.624078947 L0.408418658,10.5114474 L1.23342435,10.5114474 C1.53718572,5.95779211 2.44898038,1.66523026 5.14045933,1.66523026 L6.09564846,1.66523026 L6.09564846,27.5966079 C6.09564846,28.8111145 5.70560865,29.2445026 4.83669795,29.4617066 L3.70793089,29.7217395 L3.70793089,30.5023684 L13.0867548,30.5023684 L13.0867548,29.7217395 L11.7410154,29.4183882 C10.9160097,29.2016737 10.4810438,28.9411513 10.4810438,27.5966079 L10.4810438,1.66523026 Z"
                      fill="#6C767F"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>

                <div
                  className={`wrote-news__item js-text-animation ${
                    scrolling ? "js-fadeInUp" : ""
                  }`}
                >
                  <svg
                    width="130"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.974 31.642H0V.318l4.974.318v31.006zm8.144 0H8.143V9.302l4.975.278v22.062zM10.63 2.504c1.565 0 2.849 1.272 2.849 2.823 0 1.55-1.284 2.822-2.849 2.822-1.564 0-2.848-1.272-2.848-2.822s1.284-2.823 2.848-2.823zm14.362 11.29v4.929H21.26V31.62h-4.974V7.115C16.287 3.38 19.416 0 23.107 0c1.243 0 2.246.358 2.487.517l-.201 4.73h-2.287c-1.003 0-1.845.835-1.845 1.868v6.679h3.73zm2.012 1.987c0-3.736 3.049-6.797 6.86-6.797 3.77 0 6.82 3.06 6.82 6.797v4.77c0 1.392-1.124 2.465-2.488 2.465h-6.218v2.147c0 1.033.843 1.868 1.886 1.868h4.774l.16 4.174-4.493.676c-4.333.715-7.301-2.982-7.301-6.718V15.78zm17.933 15.861V.517h3.21v9.46c.882-.278 2.286-.397 3.249-.397 3.41 0 6.058 3.061 6.058 6.52v15.542h-3.13V16.1c0-1.709-1.404-3.06-3.129-3.06h-3.048v18.603h-3.21zm24.257-16.06c0-1.788-.842-3.22-3.129-2.98h.04c-1.283.039-2.928.198-4.292.277-.04-1.152-.08-1.59-.12-2.464 1.083-.398 2.647-.795 3.971-.835 4.012-.08 6.66 3.14 6.66 6.599v9.46c0 3.42-2.768 6.242-6.219 6.242-3.45 0-6.298-2.823-6.298-6.241v-1.948c0-3.419 2.367-6.003 6.298-6.003 1.485 0 2.247.16 3.09.398v-2.504zM81.311 9.58c3.45 0 6.298 2.783 6.298 6.241v.398c-1.243.04-2.246.04-3.169.08v-.478c0-1.67-1.404-3.06-3.129-3.06-1.685 0-3.049 1.39-3.049 3.06v9.938a3.018 3.018 0 0 0 3.049 3.06c1.685 0 3.089-1.271 3.13-2.94 1.564.119 3.048.198 3.168.198-.16 3.3-2.968 5.923-6.298 5.923-3.45 0-6.258-2.783-6.258-6.241v-9.938c0-3.458 2.808-6.24 6.258-6.24zm18.942 22.062l-6.097-10.534c-.602-1.033-.602-1.153.12-2.385l5.376-8.825h3.65l-6.057 10.177 6.539 11.567h-3.53zM93.353.596v31.046h-3.209V.596h3.21zm11.107 15.265c0-3.459 2.808-6.28 6.298-6.28 3.45 0 6.258 2.821 6.258 6.28v4.89c0 .914-.722 1.59-1.605 1.59h-7.742v3.378c0 1.71 1.364 3.1 3.089 3.1h4.052c.04 1.034.08 1.75.16 2.465l-3.851.597c-3.931.675-6.66-2.703-6.66-6.162v-9.858zm18.58 15.781h-3.21V16.14c0-3.458 2.729-6.678 6.74-6.599 1.364.04 2.207.358 3.13.795-.04.954-.08 1.75-.12 2.465l-3.49-.08c-1.686 0-3.05 1.79-3.05 3.42v15.502zM31.978 18.087h3.731V15.78c0-1.033-.842-1.868-1.845-1.868a1.875 1.875 0 0 0-1.886 1.868v2.306zm37.216 7.553v-5.367h-3.089c-1.724 0-3.088 1.352-3.088 3.061v2.306c0 1.709 1.364 3.1 3.088 3.1a3.084 3.084 0 0 0 3.09-3.1zm38.475-6.44h6.178v-3.34c0-1.708-1.404-3.1-3.09-3.1a3.085 3.085 0 0 0-3.088 3.1v3.34z"
                      fill="#6C767F"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
                <div
                  className={`wrote-news__item js-text-animation ${
                    scrolling ? "js-fadeInUp" : ""
                  }`}
                >
                  <svg
                    width="217"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.587 9.043c3.297-2.76 7.96-1.81 9.663 2.54l8.133 18.442L7.61 18.635c-4.204-2.768-3.355-7.503-1.023-9.592zM21.025.077c3.129-.342 7.052 2.027 6.368 7.158l-2.955 20.651-8.411-19.634C14.204 3.345 18.298.132 21.025.077zm7.68 6.37C28.546 2.054 31.819 0 34.675 0c.154 0 .303.009.452.02 3.18.112 6.768 3.782 5.059 8.178L31.83 27.883l-2.674-17.768c-.225-2.702 1.478-2.765 2.104-3.271-.116-.397-.965-.397-.965-.397h-1.59zm11.144 5.304c1.293-3.121 3.523-4.215 5.607-4.215 1.764 0 3.43.78 4.337 1.789 2.164 2.144 2.787 6.482-1.079 9.196L31.947 29.97l7.902-18.22zm6.988 9.363c1.147-.753 2.313-1.08 3.413-1.08 2.614.002 4.866 1.84 5.627 4.181C57.013 27.94 54.457 32 50.479 32H31.091l15.746-10.886zM6.135 32C2.155 32-.972 28.39.28 23.993c1.477-3.84 5.568-5.194 9.207-2.88L25.237 32H6.135zm197.543-5.292v-5.553s2.86 2.355 5.953 2.355c1.615 0 2.47-.855 2.47-2.245 0-2.135-2.123-2.812-4.213-3.868-2.18-1.177-4.63-3.177-4.63-6.828 0-4.06 3.05-6.907 7.313-6.907 3.072 0 4.9 1.312 4.9 1.312v5.278s-2.401-1.945-4.892-1.945c-1.613 0-2.59.794-2.59 2.128 0 1.823 1.86 2.61 3.857 3.58 3.201 1.563 5.016 3.344 5.016 6.991 0 4.002-2.765 7.468-7.418 7.468-3.263 0-5.766-1.766-5.766-1.766zM92.453 4.67h9.939c1.478 0 5.789 1.08 5.915 5.636.123 3.387-2.645 4.957-2.645 4.957 1.512.709 3.9 2.463 3.9 6.034 0 3.417-3.177 6.033-5.85 6.033h-11.26V4.67zm-7.82 0h4.786v23.522L75.178 14.278V27.33h-4.79V3.749l14.245 13.639V4.67zm25.928 11.057c.125-6.166 5.513-11.773 12.041-11.773 1.483 0 3.022.285 4.57.925v4.524c-1.328-.895-2.765-1.305-4.162-1.305-3.815 0-7.355 3.04-7.622 7.444-.154 5.428 3.583 8.412 7.543 8.412a8.024 8.024 0 0 0 4.241-1.22v4.648c-1.67.656-3.305.955-4.857.955-6.545 0-11.635-5.395-11.754-12.61zm32.766-1.4V27.44h-4.864V3.75l14.467 13.703V4.675h4.86v23.631l-14.463-13.978zm16.84-9.819h12.463v3.975h-7.655v5.576h7.655v3.855h-7.698v5.85h7.658v3.937h-12.423V4.508zm12.95.06h5.074l6.035 13.555 2.203-5.056-3.875-8.5h5.08l1.2 2.977 1.262-2.897h4.68l-3.732 8.354 2.066 5.122 5.87-13.476h5.239l-10.714 23.96-4.765-10.462-4.679 10.463-10.943-24.04zM101.543 17.96h-4.246v5.85h4.183c.974-.094 2.769-.925 2.769-2.987 0-1.97-1.73-2.803-2.706-2.863zm-4.31-9.354l.058 5.21h3.652c1.383-.187 2.45-1.233 2.45-2.803 0-1.6-1.471-2.343-2.666-2.407h-3.495z"
                      fill="#6C767F"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Why.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
  itemWidth: PropTypes.number.isRequired,
};

export default Why;
