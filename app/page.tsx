import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="container">
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </div>
  )
}
