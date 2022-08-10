import SignIn from "../sign-in/sign-in.component";
import SignUpForm from "../sign-up/sign-up-form.component";
import './auth-page.styles.scss'

const AuthUser = () => {
    return (

        <div className="authentication-container">
            <SignIn />
            <SignUpForm />
        </div>

    )
}

export default AuthUser;