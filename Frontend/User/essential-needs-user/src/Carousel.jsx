import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "img/carousel1.jpg",
      title: "Your Certified Electrical Partner",
      subtitle: "Welcome To E.N.S",
      description: "Providing safe, reliable, and expert electrical services for homes and businesses."
    },
    {
      id: 2,
      image: "img/carousel2.jpg",
      title: "Healthcare That Revolves Around You",
      subtitle: "Welcome To E.N.S",
      description: "Providing expert, compassionate healthcare for individuals and families."
    },
    {
      id: 3,
      image: "img/carousel3.jpg",
      title: "Trusted Plumbing Services Near You",
      subtitle: "Welcome To E.N.S",
      description: "From leaks to full installs, we handle it all with expert care."
    },
    {
      id: 4,
      image: "img/carousel4.jpg",
      title: "Cooler Air Starts Here",
      subtitle: "Welcome To E.N.S",
      description: "Extend the life of your AC with deep, reliable cleaning."
    },
    {
      id: 5,
      image: "img/carousel5.jpg",
      title: "Craftsmanship You Can Count On",
      subtitle: "Welcome To E.N.S",
      description: "Providing high-quality custom carpentry for homes and businesses."
    },
    {
      id: 6,
      image: "img/carousel6.jpg",
      title: "Transforming Spaces with Style",
      subtitle: "Welcome To E.N.S",
      description: "Personalized interior design that reflects your style and enhances your space."
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="container-fluid p-0 pb-5">
      <div className="position-relative overflow-hidden" style={{ height: '100vh', minHeight: '600px' }}>
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`position-absolute top-0 start-0 w-100 h-100 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              transition: 'transform 1.5s ease-in-out, opacity 1.5s ease-in-out'
            }}
          >
            {/* Background Image */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            
            {/* Overlay */}
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: 'rgba(53, 53, 53, .7)' }}
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-8 text-center">
                    <h5 
                      className="text-white text-uppercase mb-3"
                      style={{
                        animation: index === currentSlide ? 'slideInDown 1s ease-out' : '',
                        fontSize: '1.2rem',
                        letterSpacing: '2px'
                      }}
                    >
                      {slide.subtitle}
                    </h5>
                    <h1 
                      className="display-3 text-white mb-4 fw-bold"
                      style={{
                        animation: index === currentSlide ? 'slideInDown 1s ease-out 0.2s both' : '',
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        lineHeight: '1.2'
                      }}
                    >
                      {slide.title}
                    </h1>
                    <p 
                      className="fs-5 fw-medium text-white mb-4 pb-2"
                      style={{
                        animation: index === currentSlide ? 'slideInUp 1s ease-out 0.4s both' : '',
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        maxWidth: '600px',
                        margin: '0 auto 2rem'
                      }}
                    >
                      {slide.description}
                    </p>
                    <div
                      style={{
                        animation: index === currentSlide ? 'slideInUp 1s ease-out 0.6s both' : ''
                      }}
                    >
                      {/* <a 
                        href="#" 
                        className="btn btn-primary py-3 px-5 me-3 rounded-pill fw-semibold"
                        style={{
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        }}
                      >
                        Book Service
                      </a> */}
                      <Link 
                        to="/about" 
                        className="btn btn-light py-3 px-5 rounded-pill fw-semibold"
                        style={{
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="position-absolute top-50 start-0 translate-middle-y btn btn-primary ms-3"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            fontSize: '1.2rem',
            zIndex: 10,
            transition: 'all 0.3s ease',
            opacity: '0.8'
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.8';
            e.target.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <button
          onClick={nextSlide}
          className="position-absolute top-50 end-0 translate-middle-y btn btn-primary me-3"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            fontSize: '1.2rem',
            zIndex: 10,
            transition: 'all 0.3s ease',
            opacity: '0.8'
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.8';
            e.target.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots Indicator */}
        <div 
          className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 mb-4"
          style={{ zIndex: 10 }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`btn rounded-circle ${
                index === currentSlide ? 'btn-primary' : 'btn-outline-light'
              }`}
              style={{
                width: '12px',
                height: '12px',
                padding: '0',
                border: '2px solid white',
                transition: 'all 0.3s ease',
                opacity: index === currentSlide ? '1' : '0.6'
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translate3d(-100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @media (max-width: 768px) {
          .container-fluid .col-12 {
            padding: 0 1rem;
          }
          
          .btn {
            font-size: 0.9rem !important;
            padding: 0.75rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;