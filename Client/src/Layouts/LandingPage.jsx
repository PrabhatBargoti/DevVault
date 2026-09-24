import React from 'react'
import SEO from "../Components/SEO";
import LandingNav from '../Pages/LandingPage/LandingNav';
import LandingHero from '../Pages/LandingPage/LandingHero';
import LandingSnippet from '../Pages/LandingPage/LandingSnippet';
import LandingSolution from '../Pages/LandingPage/LandingSolution';
import LandingHowItWork from '../Pages/LandingPage/LandingHowItWork';
import LandingOpenSource from '../Pages/LandingPage/LandingOpenSource';
import LandingFooter from '../Pages/LandingPage/LandingFooter';
import LandingCTA from '../Pages/LandingPage/LandingCTA';

const LandingPage = () => {
    return (
        <div className='bg-[#0B0D12]'>
            <SEO
                title="Your Developer Knowledge Vault"
                description="Save, organize, and find your code snippets, notes, and developer knowledge in one powerful vault."
                path="/"
            />
            <header className='sticky top-0 z-50 bg-[#0B0D12]/80 backdrop-blur-md'>
                <LandingNav />
            </header>
            <main>
                <LandingHero />
                <LandingSnippet />
                <LandingSolution />
                <LandingHowItWork />
                <LandingOpenSource />
                <LandingCTA />
            </main>
            <footer>
                <LandingFooter />
            </footer>
        </div>
    )
}

export default LandingPage
