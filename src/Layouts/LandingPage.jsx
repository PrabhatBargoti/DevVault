import React from 'react'
import SEO from "../Components/SEO";
import LandingNav from '../Pages/LandingPage/LandingNav';
import LandingHero from '../Pages/LandingPage/LandingHero';

const LandingPage = () => {
    return (
        <>
            <SEO
                title="Your Developer Knowledge Vault"
                description="Save, organize, and find your code snippets, notes, and developer knowledge in one powerful vault."
                path="/"
            />
            <LandingNav />
            <LandingHero />
        </>
    )
}

export default LandingPage
