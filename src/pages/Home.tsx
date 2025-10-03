import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "@/components/language-switcher"
import { supabase } from "@/lib/supabase"
import { enableAuth } from "@/utils/miscelanea"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, ChevronRight, Code } from "lucide-react"

const Home = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  return (
    <div className="flex flex-col h-screen overflow-hidden ">
      <div className="flex items-center justify-between w-full py-4 px-8 shadow-sm ">
        <img src={theme === "dark" ? "/timbal_w.svg" : "/timbal_b.svg"} alt="Timbal" className="h-5 w-auto" />
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
          {enableAuth && <Button variant="destructive" onClick={() => supabase.auth.signOut()}>{t("home.logout")}</Button>}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 flex-1 max-w-2xl mx-auto w-full px-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-5xl md:text-6xl font-semibold text-center">{t("home.title")}</h1>
          <p className="text-center text-md md:text-lg text-muted-foreground">{t("home.description")}</p>
        </div>
        <div className="w-full bg-muted rounded-lg p-4 font-mono text-sm text-center my-8">
          <span>{t("home.codeBlock")} <span className="font-bold">src/App.tsx</span></span>
        </div>
        <Button onClick={() => toast.info(t("home.getStartedMessage"))}>{t("home.getStarted")}</Button>
      </div>
      <div className="flex md:flex-row flex-col max-w-3xl mx-auto w-full pb-24 gap-4 px-4">
        <Card 
        className="w-full md:w-1/2 group cursor-pointer shadow-none bg-transparent hover:border-primary" 
        onClick={() => window.open("https://www.npmjs.com/package/@timbal-ai/timbal-sdk", "_blank")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="size-4" />
              {t("home.cardSDK.title")}
              <ChevronRight className="size-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
            </CardTitle>
            <CardContent className="text-sm text-muted-foreground mt-1">{t("home.cardSDK.description")}</CardContent>
          </CardHeader>
        </Card>
        <Card
          className="w-full md:w-1/2 group cursor-pointer shadow-none bg-transparent hover:border-primary"
          onClick={() => window.open("https://docs.timbal.ai", "_blank")}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="size-4" />
              {t("home.cardFramework.title")}
              <ChevronRight className="size-4 ml-auto group-hover:translate-x-1 transition-transform duration-300" />
            </CardTitle>
            <CardContent className="text-sm text-muted-foreground mt-1">{t("home.cardFramework.description")}</CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default Home