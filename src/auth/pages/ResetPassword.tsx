import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, Loader2 } from 'lucide-react'

const ResetPassword = () => {
    const { t } = useTranslation()
    const { theme, systemTheme } = useTheme()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const currentTheme = theme === 'system' ? systemTheme : theme
    const logo = currentTheme === 'dark' ? '/timbal_w.svg' : '/timbal_b.svg'

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        if (password !== confirmPassword) {
            setError(t('auth.resetPassword.passwordMismatch'))
            return
        }

        setLoading(true)

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            setSuccess(true)
            setTimeout(() => {
                navigate('/auth/login')
            }, 2000)
        } catch (err: any) {
            setError(err.message || t('auth.resetPassword.error'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="flex justify-center mb-4 mr-1">
                <img src={logo} alt="Timbal" className="h-5 w-auto" />
            </div>
            <div className="flex justify-center mb-4">
                <img src={logo} alt="Timbal" className="h-5 w-auto" />
            </div>
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-4">

                    <div className="space-y-2 text-center">
                        <CardTitle className="text-2xl font-bold">{t('auth.resetPassword.title')}</CardTitle>
                        <CardDescription>{t('auth.resetPassword.subtitle')}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <AlertDescription className="text-green-600 dark:text-green-400">
                                {t('auth.resetPassword.success')}
                            </AlertDescription>
                        </Alert>
                    )}

                    {!success && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">{t('auth.resetPassword.password')}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder={"********"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">{t('auth.resetPassword.confirmPassword')}</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {t('auth.resetPassword.button')}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPassword