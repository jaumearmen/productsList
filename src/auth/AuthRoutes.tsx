import { Routes, Route } from 'react-router-dom'
import LogIn from '@/auth/pages/LogIn'
import SignUp from '@/auth/pages/SignUp'
import ForgotPassword from '@/auth/pages/ForgotPassword'
import ResetPassword from '@/auth/pages/ResetPassword'
import NotFound from '@/pages/NotFound'

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AuthRoutes