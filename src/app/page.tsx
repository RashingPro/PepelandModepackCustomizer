"use server"

import Header from "@/modules/header.module/module";
import Footer from "@/modules/footer.module/module";

export default async function Page() {
    return <>
        <Header />
        <Footer />
    </>
}