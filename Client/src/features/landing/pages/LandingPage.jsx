import SEO from '../../../shared/components/SEO'
import LandingNav from '../components/LandingNav'
import LandingHero from '../components/LandingHero'
import LandingSnippet from '../components/LandingSnippet'
import LandingSolution from '../components/LandingSolution'
import LandingHowItWork from '../components/LandingHowItWork'
import LandingOpenSource from '../components/LandingOpenSource'
import LandingFooter from '../components/LandingFooter'
import LandingCTA from '../components/LandingCTA'

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
