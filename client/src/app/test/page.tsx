"use client";
import Audio from "@/components/Audio";
import Navbar from "@/components/Navbar";
import { useState } from "react";


const Page = () => {
    const [toggleVoice, setToggleVoice] = useState(false);

    return (
      <>
        <Navbar/> 
        <section className="container  h-[90vh]  flex items-center justify-center">
          <Audio />
        </section>
      </>
    );
  };

export default Page;