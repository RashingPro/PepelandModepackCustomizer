"use client"

import "./module.css";
import Image from "next/image";
import {useEffect, useState} from "react";


function LogoComponent() {
    return <div className={"headerLogoContainer"}>
        <Image src={"/logo.svg"} alt={"Pepeland Logo"} width={1} height={1} className={"headerLogoImage"}/>
        <h1 className={"headerLogoTitle"}>Pepeland Modpack Customizer</h1>
    </div>
}

interface NavigationLinkProps {
    text: string,
    link: string
}

function NavigationLink({ text, link }: NavigationLinkProps) {
    return <a href={link} className={"headerNavigationLink"}>{text}</a>
}

function NavigationComponent() {
    return <div className={"headerNavigationContainer"}>
        <NavigationLink text={"Главная"} link={"/"} />
        <NavigationLink text={"Каталог"} link={"/catalog"} />
        <NavigationLink text={"Поддержка"} link={"/support"} />
    </div>
}

interface AccountAuthorisedProps {
    display_name: string
}

function AccountAuthorisedComponent({display_name}: AccountAuthorisedProps) {
    return <div className={"headerAccountContainer"}>
        {display_name}

    </div>;
}

function AccountComponent() {
    const [isAuth, setIsAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchIsAuth = async () => {
            try {
                const response = await fetch("/api/auth/is_auth");
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();
                const getUserData = async () => {
                    try {
                        setIsLoading(true);
                        const userDataResponse = await fetch("/api/auth/via/discord/get_current_user")
                        if (!userDataResponse.ok) {
                            throw new Error(userDataResponse.statusText);
                        }
                        const _userData = await userDataResponse.json()
                        setUserData(_userData);
                    } catch (error) {
                        console.error(error)
                    } finally {
                        setIsLoading(false);
                    }
                }
                if (data["is_auth"]) {
                    getUserData()
                }
                setIsAuth(data["is_auth"]);

            } catch (error) {
                console.error(error);
                setIsAuth(null);
            } finally {
                setIsLoading(false);
            }
        }
        fetchIsAuth();
    }, [])

    const discord_login_url = "https://discord.com/oauth2/authorize?client_id=1352541404332556288&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fvia%2Fdiscord%2F&scope=identify+email+guilds"

    if (isLoading) return <div className={"headerAccountContainer"}>
        <>Loading...</>
    </div>;
    if (!isAuth) return <div className={"headerAccountContainer"}>
        <a href={discord_login_url}>Войти</a>
    </div>;

    if (!userData?.["global_name"]) return <div className={"headerAccountContainer"}>
        <a href={discord_login_url}>Войти</a>
    </div>;
    return <AccountAuthorisedComponent display_name={userData["global_name"]} />
}


interface ModuleProps {

}

export default function Module({}: ModuleProps) {
    return <header className={"header"}>
        <div className={"headerContainer"}>
            <LogoComponent />
            <NavigationComponent />
            <AccountComponent />
        </div>
    </header>
}