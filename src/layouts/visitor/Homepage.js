import React, { useState } from 'react';
import Header from '../../components/visitor/Header';
import VisualShape from '../../components/visitor/Visual';
import ControlBudget from '../../components/visitor/Control_budget';
import Shape from '../../components/visitor/Shape';
import Features from '../../components/visitor/Features';
import Why from '../../components/visitor/Why';
import Footer from '../../components/visitor/Footer';
// import '../../assets/styles/Styles.css';
import HomepageStyles from './styles';

const Homepage = () => {
  const [testimonials] = useState([
    { text: "The app works intuitively, it makes it super easy to control your money. It helps me to develop healthy spending habits.", author: "Roy" },
    { text: "I am using this app for more than two years and I could not be happier with the service I got.", author: "Marek" },
    { text: "I've tried other money tracking apps before Project, but I choose to stick to this because of its simplicity and intuitive design. ", author: "Harnet" },
    { text: "The fact that it is cross-platform has made my life easier. I am always in control with my finances.", author: "Paolo" },
    { text: " Really loved this app. This app helps me to analyse my expenses and income. Best thing is it indexes everything based on hash which helps to see the expenses at once.", author: "Deepak" },
    { text: " Easy to use, great design, sync option and it has a very simple and nice-looking widget that makes it even easier to use.", author: "Aleksandra" },
    { text: " Easy to use, great design, sync option and it has a very simple and nice-looking widget that makes it even easier to use.", author: "Aleksandra" },
  ]);
  const [itemWidth] = useState(300);

  return (
    <div>
      <HomepageStyles>
        <body className='page'>
          <Header />
          <div className='visual' id='visual'>
            <VisualShape />
          </div>
          <div className='control-budget' id='control-budget'>
            <ControlBudget />
          </div>
          <div className='shape is-loaded' id='shapes'>
            <Shape />
          </div>
          <div className='features' id='features'>
            <Features />
          </div>
          <div className="why" id='why'>
            <Why testimonials={testimonials} itemWidth={itemWidth} />
          </div>
          <Footer />
        </body>
      </HomepageStyles>
    </div>
  );
}

export default Homepage;