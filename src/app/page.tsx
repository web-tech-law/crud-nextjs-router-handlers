import Image from "next/image";
import imgCapa from "@/img/food_facebook_cover_29.jpg";

export default function Home() {
  return (
    <div className="content-wrap">
      
      {/* <Image src="/assets/img/food_facebook_cover_29.jpg" alt="Hamburguer" layout="responsive" width={0} height={0}/> */}
      <Image src={ imgCapa } alt="Hamburguer"/>

    </div>
  )
}
