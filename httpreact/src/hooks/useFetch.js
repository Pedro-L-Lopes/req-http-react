import { useState, useEffect } from "react";

// 4 - Custom Hook
export const useFetch = (url) => {
    const [data, setData] = useState(null)

    // 5 - Refatorando Post
    const [config, setConfig] = useState(null)
    const [method, SetMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    // 6 - Loading
    const [loading, setLoading] = useState(false)

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
              method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
            SetMethod(method)
        }
    }

    useEffect(() => {

        const fetchData = async () => {

            // 6 - Loading
            setLoading(true)

            const res = await fetch(url)

            const json = await res.json()

            setData(json)

            setLoading(false)
        }

        fetchData()

    }, [url, callFetch])

    // 5 - Refatorando Post ²
    useEffect(() => {
        const httpRequest = async () => {
            if(method === "POST"){
             
                let fetchOptions = [url, config]
    
                const res = await fetch(...fetchOptions)
    
                const json = await res.json()

                setCallFetch(json)
            }
        }

        httpRequest()
    }, [config, method, url])

    return {data, httpConfig, loading}
}