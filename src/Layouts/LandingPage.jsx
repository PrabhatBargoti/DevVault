import React from 'react'
import SEO from "../Components/SEO";
import LandingNav from '../Pages/LandingPage/LandingNav';
import LandingHero from '../Pages/LandingPage/LandingHero';
import LandingSnippet from '../Pages/LandingPage/LandingSnippet';

const LandingPage = () => {
    return (
        <div className='bg-[#0B0D12]'>
            <SEO
                title="Your Developer Knowledge Vault"
                description="Save, organize, and find your code snippets, notes, and developer knowledge in one powerful vault."
                path="/"
            />
            <LandingNav />
            <LandingHero />
            <LandingSnippet/>
        </div>
    )
}

export default LandingPage
