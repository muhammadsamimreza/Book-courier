import React from 'react';
import { Banner } from '../../../components/Banner/Banner';
import LatestBooks from '../../../components/LatestBooks/LatestBooks';
import CoverageSection from '../../../components/CoverageSection/CoverageSection';
import Coverage from '../../../components/Coverage/Coverage';
import WhyChoose from '../../../components/WhyChoose/WhyChoose';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
            <Coverage></Coverage>
            <WhyChoose></WhyChoose>
        </div>
    );
};

export default Home;