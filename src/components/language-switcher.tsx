import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
    const { i18n, t } = useTranslation();

    const languages = [
        { code: "en", label: t("languages.en"), flag: "us" },
        { code: "es", label: t("languages.es"), flag: "es" },
    ];

    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    {t(`languages.${i18n.language}`)}
                    <span className="sr-only">Select language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((language) => (
                    <DropdownMenuItem key={language.code} onClick={() => changeLanguage(language.code)}>
                        {language.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

