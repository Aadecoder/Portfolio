import { TypeAnimation } from "react-type-animation"

export default function AnimatedText({content}){
            <TypeAnimation
                  sequence={[`${content}`]}
                  wrapper="p"
                  speed={50}
                  style={{ fontSize: '1.25em', display: 'inline-block' }}
                  repeat={0}
            />}