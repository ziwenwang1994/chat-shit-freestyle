import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SingupForm";

export default function SignUp() {
  return (
    <div className="mx-8 max-w-[320px] sm:max-w-[600px] sm:mx-auto bg-white my-10 sm:p-12 p-4 rounded-xl">
      <h2 className="text-center text-black text-2xl font-bold py-4">
        Become a new member of freestyle GPT!
      </h2>
      <section className="my-4">
        <SignUpForm />
      </section>
    </div>
  );
}
