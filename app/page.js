import Link from "next/link";

export default function Home() {
  let linkstyles = "underline text-cyan-600 hover:text-cyan-300";
  
  return (
    <main>
      <h1 className="text-3xl">Pokemon Wordle</h1> 
      <ul>
        <li><Link href="./game/" className="underline text-cyan-600 hover:text-cyan-300">Game</Link></li>
      </ul>
    </main>
  );
}
