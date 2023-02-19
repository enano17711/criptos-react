import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import useSelectMonedas from "../hooks/useSelectMonedas.jsx"
import monedas from "../data/monedas.js"

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

const Formulario = () => {
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
    return (
        <form>
            <SelectMonedas />
            <SelectCriptoMonedas />
            <InputSubmit type="submit" value="Cotizar" />
        </form>
    )
}

export default Formulario
