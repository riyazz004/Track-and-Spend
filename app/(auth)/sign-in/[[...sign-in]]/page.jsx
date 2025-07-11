import { SignIn } from '@clerk/nextjs'


export default function Page() {

  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/good.jpg')" }}>

      <SignIn redirectUrl='/dashboard' 
      afterSignInUrl='/dashboard'
      afterSignUpUrl='/dashboard'
      />
    </div>

  )
}