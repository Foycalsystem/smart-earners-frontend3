import { Loader } from "./styles";
import Image from "next/image";
const gif = '/gif/1.gif'

export default function Loader_() {
  return (
    <Loader>
        <img src={gif} alt="" height='100' width='100'/>
    </Loader>
  )
}
