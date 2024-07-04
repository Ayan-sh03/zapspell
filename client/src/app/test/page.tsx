"use client";
import Audio from "@/components/Audio";
import { useState } from "react";


const Page = () => {
    const [toggleVoice, setToggleVoice] = useState(false);
  
    return (
      <section className="max-h-screen container w-full h-screen flex items-center justify-center">
        <Audio />
      </section>
    );
  };

export default Page;
