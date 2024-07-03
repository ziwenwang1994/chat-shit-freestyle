import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="mx-8 max-w-[320px] sm:max-w-[600px] sm:mx-auto bg-white my-10 sm:p-12 p-4 rounded-xl">
      <h2 className="text-center text-black text-2xl font-bold py-4">
       {"Login to freestyle with bot :)"} 
      </h2>
      <section className="my-4">
        <LoginForm />
      </section>
    </div>
  );
}
