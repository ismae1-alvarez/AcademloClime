import React, { Fragment, useEffect, useState } from 'react'


interface Grados {
    celsius : number;
    fahrenheit? : number
}

interface Props {
    whater? : any;
    grados? : Grados;
}

const CardClime :React.FC<Props>= ({whater, grados}) => {
    const [clime, setClime] = useState<boolean>(true)
    

    const handleClime =()=>{
        setClime(!clime)
    }
    
  return (
    <Fragment>
        <article className='bg-black text-white rounded-sm p-5 w-fit mx-auto mt-10 bg-opacity-25  '>
            <h2 className='text-2xl font-bold'>
                Whater App
            </h2>
            <h3 className=''>
                {whater[0]?.name}, {whater[0]?.sys.country}
            </h3>
            <section>
                <div>
                   <img src={`https://openweathermap.org/img/wn/${whater[0]?.weather[0].icon}@4x.png`} alt="icon de clima" className='h-10 w-10'/>
                </div>
                <article>
                    <h4>{whater[0]?.weather[0].description}</h4>
                    <ul>
                        <li><span>Wind Speed</span><span>{whater[0]?.wind.speed}m/s</span></li>
                        <li><span>Clouds</span><span></span>{whater[0]?.clouds.all}%</li>
                        <li><span>Pressure</span><span>{whater[0]?.main.pressure} hpa</span></li>
                    </ul>
                </article>

                <h2 className='text-xl'>
                    {
                        clime ? grados?.celsius :  grados?.fahrenheit
                    }
                </h2>
                <button onClick={handleClime} className='flex flex-col items-center justify-center py-2 px-3 bg-sky-500 rounded-md'>
                    {clime ? <p>fahrenheit</p>:  <p>celsius</p>}
                </button>

            </section>
        </article>
    </Fragment>
  )
}

export default CardClime