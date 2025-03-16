"use client"

import "./module.css";
import { isUserAuthenticated } from "@/managers/auth.manager/manager";
import Image from "next/image";


function LogoComponent() {
    return <>
        <Image src={"/logo.svg"} alt={"Pepeland Logo"} width={1} height={1} className={"headerLogoImage"}/>
        Pepeland Modpack
    </>
}


interface ModuleProps {

}

export default function Module({}: ModuleProps) {
    return <header className={"headerContainer"}>
        <LogoComponent />
    </header>
}