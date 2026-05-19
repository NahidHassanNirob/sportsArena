import { FeaturedFacilitiesSection } from "@/components/FeaturedFacilities";
import { HeroSection } from "@/components/Hero";

import Image from "next/image";

export default function Home() {
  return (
   <div>
    <HeroSection></HeroSection>
    <FeaturedFacilitiesSection></FeaturedFacilitiesSection>
   </div> 
  );
}
