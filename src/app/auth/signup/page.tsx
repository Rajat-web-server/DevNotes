"use Client";

export default function SignupPage() {
  async function handleSignup() {
  const response =  await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Rajat",
        email: "rajat@gmail.com",
        password: "mypassword123",
      }),
    });
        const result = await response.json();
        console.log(result);
  }
   return <button onClick={handleSignup}>Sign up</button>;
}
