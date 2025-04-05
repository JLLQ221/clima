import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../css/main.css"

export default function Welcome() {
    const [temperaturaApi, setTemperaturaApi] = useState(0);
    const [temperaturaSensor, setTemperaturaSensor] = useState(0);
    const [diferenciaGrados, setDiferenciaGrados] = useState(0);
    const temperatura = 35;

    const postTemperatura = async () => {
        try {
            const response = await axios.post(route("Posttemperatura",[temperatura]));
        } catch (error) {
            console.error(error);
        }
    };

    const diferencia = (temperatura1, temperatura2) => {
        const diferencia = Math.abs(temperatura1 - temperatura2); // Asegura que sea positivo
        setDiferenciaGrados(diferencia);
        console.log(diferencia);
    };

    const getTemperaturas = async () => {
        try {
            const response = await axios.get(route("getTemperaturaLast"));
            
            // Actualiza los estados con los valores de la respuesta
            setTemperaturaApi(response.data[0].temperatura_api);
            setTemperaturaSensor(response.data[0].temperatura_sensor);
            
            // Llama a diferencia() después de procesar la respuesta
            diferencia(response.data[0].temperatura_api, response.data[0].temperatura_sensor);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Llamada inicial al montar el componente
        getTemperaturas(); 
        // postTemperatura(); // Descomenta esta línea si necesitas llamar esta función también
        
        const interval = setInterval(() => {
            // Llamadas periódicas a tus funciones
            getTemperaturas();
            // postTemperatura(); // Descomenta si necesitas
        }, 15000); // 15000 milisegundos = 15 segundos
    
        // Limpieza del intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);
    
    return (
        <>
            <Head title="Welcome" />

            <main className="app relative overflow-hidden">
                <div className="cloud x1"></div>
                <div className="cloud x2"></div>
                <div className="cloud x3"></div>
                <div className="cloud x4"></div>
                <div className="cloud x5"></div>

                <div className='flex absolute inset-0 px-2 z-10 flex-col justify-center md:flex-row md:px-6'>
                    {/* Temperatura de Api por internet */}
                    <div className='w-full flex flex-col justify-center items-center z-10 py-4 rounded'>
                        <div className='flex flex-col items-center'>
                            <p className='font-bold text-white text-2xl shadow p-2 bg-indigo-600/10 rounded'>Temperatura de internet</p>
                            <div className='flex items-end mt-2'>
                                {temperaturaApi !== null && (temperaturaApi < 31
                                    ?
                                    <svg className="bi bi-thermometer size-12" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                        <path color='red' d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                        <path color='#F7B003' d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z" />
                                    </svg>
                                    :
                                    <svg className="bi bi-thermometer-half size-12" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                        <path color='red' d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                                        <path color='#F7B003' d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                                    </svg>)
                                }
                                <p className='text-center font-bold text-xl'> {temperaturaApi} °C</p>
                            </div>
                            <svg className="size-48 rotating" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 2200 2200" xmlSpace="preserve" preserveAspectRatio="xMidYMid meet">
                                <g id="Objects">
                                    <g>
                                        <path fill="#F7B003" d="M1752.279,1163.306l156.196-129.831l-156.196-129.832l94.821-179.654l-194.112-59.914 l18.694-202.274l-202.283,18.686l-59.914-194.112l-179.654,94.821L1100,225L970.168,381.196l-179.654-94.821l-59.914,194.112 l-202.274-18.694l18.686,202.283L352.9,723.989l94.821,179.654l-156.196,129.832l156.196,129.831L352.9,1342.96l194.112,59.914 l-18.694,202.274l202.283-18.686l59.914,194.112l179.654-94.821L1100,1841.949l129.832-156.196l179.654,94.821l59.914-194.112 l202.274,18.694l-18.686-202.283l194.112-59.914L1752.279,1163.306z M1100,1627.509c-328.076,0-594.034-265.958-594.034-594.034 S771.924,439.44,1100,439.44s594.034,265.958,594.034,594.034S1428.076,1627.509,1100,1627.509z" />
                                        <circle fill="#F7B003" cx="1100" cy="1033.475" r="562.041" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>

                    <div className='mb-10 md:mb-0 flex justify-center items-start md:items-center rounded h-2 w-full bg-white md:w-4 md:h-svh'>
                        <p className='text-white shadow text-2xl p-2 text-center bg-yellow-400 rounded'>Diferencia <span className='font-black'>{diferenciaGrados}</span> grados</p>
                    </div>

                    {/* Temperatura de sensor */}
                    <div className='w-full flex flex-col justify-center items-center z-10 py-4 rounded'>
                        <div className='flex flex-col items-center'>
                            <p className='font-bold text-white text-2xl shadow p-2 rounded'>Temperatura del sensor</p>
                            <div className='flex items-end mt-2'>
                                {temperaturaSensor !== null && (temperaturaSensor < 31
                                    ?
                                    <svg className="bi bi-thermometer size-12" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                        <path color='red' d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                        <path color='#F7B003' d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z" />
                                    </svg>
                                    :
                                    <svg className="bi bi-thermometer-half size-12" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                        <path color='red' d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                                        <path color='#F7B003' d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                                    </svg>)
                                }
                                <p className='text-center font-bold text-xl'> {temperaturaSensor} °C</p>
                            </div>
                            <svg className="size-48 rotating" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 2200 2200" xmlSpace="preserve" preserveAspectRatio="xMidYMid meet">
                                <g id="Objects">
                                    <g>
                                        <path fill="#F7B003" d="M1752.279,1163.306l156.196-129.831l-156.196-129.832l94.821-179.654l-194.112-59.914 l18.694-202.274l-202.283,18.686l-59.914-194.112l-179.654,94.821L1100,225L970.168,381.196l-179.654-94.821l-59.914,194.112 l-202.274-18.694l18.686,202.283L352.9,723.989l94.821,179.654l-156.196,129.832l156.196,129.831L352.9,1342.96l194.112,59.914 l-18.694,202.274l202.283-18.686l59.914,194.112l179.654-94.821L1100,1841.949l129.832-156.196l179.654,94.821l59.914-194.112 l202.274,18.694l-18.686-202.283l194.112-59.914L1752.279,1163.306z M1100,1627.509c-328.076,0-594.034-265.958-594.034-594.034 S771.924,439.44,1100,439.44s594.034,265.958,594.034,594.034S1428.076,1627.509,1100,1627.509z" />
                                        <circle fill="#F7B003" cx="1100" cy="1033.475" r="562.041" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}
