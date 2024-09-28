"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, SVGProps, useEffect, useState } from "react";
import { source_code } from "@/app/font";
import { useToast } from "./ui/use-toast";
import { decrypt } from "@/utils/word";

export default function Audio() {
  const [word, setWord] = useState("");
  const [wordId, setWordId] = useState("");
  const [gettingWord, setGettingWord] = useState(false);
  const [enteredWord, setEnteredWord] = useState("");
  const { toast } = useToast();

  const getWord = async () => {
    setGettingWord(true);
    const res = await fetch(`api/word`);
    if (!res.ok) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    const data = await res.json();
    console.log("====================================");
    console.log(data.word);
    console.log(data.id);
    console.log("====================================");

    const decryptedWord = decrypt(data.word);

    setGettingWord(false);
    setWord(decryptedWord);
    setWordId(data.id);
  };

  async function addAttempt() {
    const res = await fetch(`/api/attempt/add`, {
      method: "POST",
      body: JSON.stringify({
        attemptWord: enteredWord,
        wordId: wordId,
      }),
    });

    const { data } = await res.json();
    console.log(data);

    if (!res.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong when submitting the attempt",
      });
      return;
    }

    return data.is_correct;
  }

  useEffect(() => {
    getWord();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (enteredWord.length == 0 || enteredWord.trim().length == 0) {
      toast({
        variant: "destructive",
        title: "Please Enter a Word",
      });
      return;
    }
    const isCorrect = await addAttempt();

    if (isCorrect) {
      setEnteredWord("");
      await getWord();
      toast({
        variant: "success",
        title: "Correct!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect!, Please Try Again",
      });
    }
  }

  function speak() {
    let utterance = new SpeechSynthesisUtterance(word || "hello world");
    let voicesArray = speechSynthesis.getVoices();
    utterance.voice = voicesArray[3];
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  }
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-full bg-background text-foreground ${source_code.className}`}
    >
      <div className="max-w-md w-full space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Test </h1>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">
                Press Play to listen to the Word
              </p>
            </div>
            <div>
              <Button
                disabled={gettingWord}
                onClick={() => speak()}
                variant="ghost"
                size="icon"
              >
                <PlayIcon className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
        <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="word"
            value={enteredWord}
            onChange={({ target }) => setEnteredWord(target.value)}
            placeholder="Enter your Spelling here"
            className="flex-1"
          />
          <Button type="submit">Submit</Button>
        </form>

        <Button disabled={gettingWord} onClick={getWord}>
          New Word
        </Button>
      </div>
    </div>
  );
}

function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
