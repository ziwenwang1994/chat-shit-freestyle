import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="mx-auto w-[500px] bg-white my-10 p-12 rounded-xl">
      <h2 className="text-center text-black text-2xl font-bold py-4">Login to freestyle with bot :)</h2>
      <section className="my-4">
        <LoginForm />
      </section>
    </div>
  );
}
