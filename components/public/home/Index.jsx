import Hero from "./Hero"
import OurServices from "./OurServices"
import StatAndTestimony from "./StatAndTestimony"
import AboutUs from "./AboutUs"
import Partners from "./Partners"
import Plans from "./Plans"


export default function Index({userInfo}) {

    return (
        <div>
            <Hero userInfo={userInfo}/>
            <OurServices  userInfo={userInfo}/>
            <Plans userInfo={userInfo}/>
            <StatAndTestimony  userInfo={userInfo}/>
            <AboutUs  userInfo={userInfo}/>
            <Partners userInfo={userInfo}/>
        </div>
    )
}
