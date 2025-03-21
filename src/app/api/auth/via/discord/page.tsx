"use client"

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Page() {
    const code = useSearchParams().get("code");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const exchangeToken = async () => {
            try {
                const response = await fetch(`/api/auth/via/discord/exchange_code`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"code": code})
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const responseData = await response.json()
                const token = responseData["access_token"];
                const refreshToken = responseData["refresh_token"];
                console.log(`Got following data from api: ${token}; ${refreshToken}`)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        exchangeToken()
    }, [])
    if (isLoading) return <>Подождите, мы авторизуем вас...</>;
    return <>Успешно! Токен получен</>
}