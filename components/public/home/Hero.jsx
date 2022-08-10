import Image from 'next/image'
import {useSnap} from '@mozeyinedu/hooks-lab'
import {useRouter} from 'next/router'

import {
    HeroSectionWrapper,
} from './styles';



const Hero = () => {
    const {snap} = useSnap(.5)
    const router = useRouter();

    return (

        <HeroSectionWrapper>
            <section className="meso-layer">
                    <aside className="left-side">
                        <h1 style={{fontSize: '2.3rem'}}>SmartEarners</h1>
                        <p>A Forex trading solution built for anyone with Small Capital to invest in forex and make a nice income</p>
                        <button {...snap()} onClick={()=>router.push(`/dashboard/`)}>Get Started</button>
                    </aside>

                    <aside className="right-side">
                        <Image src={"/hero.png"} width="400" height="200" alt="Hero Flat Characters" />
                    </aside>
            </section>
        
        </HeroSectionWrapper>
    )
}



export default Hero