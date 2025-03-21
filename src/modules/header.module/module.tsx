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

function AccountAuthorisedComponent() {
    return <>Logged in!</>
}

function AccountComponent() {
    const [isAuth, setIsAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIsAuth = async () => {
            try {
                const response = await fetch("/api/auth/is_auth");
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();
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

    return <div className={"headerAccountContainer"}>
        {isLoading ? <>Loading...</> : isAuth ? <>Auth</> : <>Not auth</>}
    </div>
}


interface ModuleProps {

}

export default function Module({}: ModuleProps) {
    return <header className={"headerContainer"}>
        <LogoComponent />
        <NavigationComponent />
        <AccountComponent />
    </header>
}