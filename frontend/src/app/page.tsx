export default function Home() {
  return (
      <main className="">
        <h1>{process.env.NEXT_PUBLIC_API_BASE_URL}</h1>
      </main>
  );
}
