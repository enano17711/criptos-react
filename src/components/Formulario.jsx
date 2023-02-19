import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import useSelectMonedas from "../hooks/useSelectMonedas.jsx"
import monedas from "../data/monedas.js"
import Error from "./Error.jsx"

const InputSubmit = styled.input`
    background-color: #9597ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 30px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

const Formulario = ({ setMonedas }) => {
    const [error, setError] = useState(false)
    const [criptos, setCriptos] = useState([])
    const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas)
    const [criptoMoneda, SelectCriptoMonedas] = useSelectMonedas(
        "Elige tu criptomoneda",
        criptos
    )

    useEffect(() => {
        const consultarApi = async () => {
            let url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map((cripto) => ({
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName,
            }))
            setCriptos(arrayCriptos)
        }
        consultarApi()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([moneda, criptoMoneda].includes("")) {
            setError(true)
            return
        }
        setError(false)
        setMonedas({ moneda, criptoMoneda })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptoMonedas />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario
