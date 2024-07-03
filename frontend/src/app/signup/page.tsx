import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SingupForm";

export default function SignUp() {
  return (
    <div className="mx-auto w-[500px] bg-white my-10 p-12 rounded-xl">
      <h2 className="text-center text-black text-2xl font-bold py-4">
        Become a new member of freestyle GPT!
      </h2>
      <section className="my-4">
        <SignUpForm />
      </section>
    </div>
  );
}
