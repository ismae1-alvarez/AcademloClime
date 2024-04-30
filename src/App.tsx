import React, { Fragment, useEffect, useState, useRef } from "react";
// import Card from "./components/Card";
import { State  }  from 'country-state-city';
import axios from "axios";
import CardClime from "./components/CardClime";
import ClimeImage from "./util/ClimeImage";

interface Datos {
  latitude? : number
  longitude? : number
}

interface Grados {
  celsius : number;
  fahrenheit?: number;
}

type Nacionalidad = {
  nombre: string;
  codigo: string;
};

const App: React.FC = () => {
  const [ubicacion, setUbicacion] = useState<Datos[]>([]);

  const [searching, setSearching] = useState<string>('MX');
  const [countryCity, setCountryCity] = useState<any>([])
  
  const [country, setCountry] = useState<string>("")

  const [whater, setWhater] = useState<any>([])
  const [photoSelected, setPhotoSelected] = useState<any>(1)

  const [location, setLocatio] = useState<boolean>(true)

  const [grados, setGrados]  = useState<Grados>({
    celsius : 0,
    fahrenheit : 0,
  })

  const [nacionalidades, setNacionalidades] = useState<Nacionalidad[]>([
    { nombre: "México", codigo: "MX" },
    { nombre: "Argentina", codigo: "AR" },
    { nombre: "Perú", codigo: "PE" },
    { nombre: "Colombia", codigo: "CO" },
    { nombre: "Brasil", codigo: "BR" },
    { nombre: "Venezuela", codigo: "VE" },
    { nombre: "Chile", codigo: "CL" },
    { nombre: "Ecuador", codigo: "EC" },
    { nombre: "Bolivia", codigo: "BO" },
    { nombre: "Paraguay", codigo: "PY" },
  ]);
  const myRef = useRef<HTMLInputElement>(null);
  const selectRefCountry = useRef<HTMLSelectElement>(null);
  const selectRefCity = useRef<HTMLSelectElement>(null);


  useEffect(()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          const {latitude, longitude} =  position.coords;
          setUbicacion([{latitude, longitude}])
          setLocatio(true)

        }, ()=> setLocatio(false))
        
      }else{
        console.log("No Acepto")
      }
  },[])
  useEffect(()=>{

    if(country){
      axios.get(`https://restcountries.com/v3.1/name/${country}`)
      .then(res=> setSearching((res.data[0].altSpellings[0])))
      .catch(err => console.log(err))
    }
  },[country])

  useEffect(()=>{
    if(ubicacion.length > 0){
      const url  = `https://api.openweathermap.org/data/2.5/weather?lat=${ubicacion[0].latitude}&lon=${ubicacion[0].longitude}&appid=${import.meta.env.VITE_API_KEY}`

      axios.get(url)
        .then(res =>{
          setWhater([res.data])
          const changeCelcius =  (res.data.main.temp - 273.15).toFixed(1);
          const celsius =  parseInt(changeCelcius)
          const changeFahrenheit = (celsius * 9/5 + 32).toFixed(1)
          const fahrenheit =  parseInt(changeFahrenheit)
          const image = ClimeImage(celsius);
          setPhotoSelected(image)
          setGrados({celsius, fahrenheit})

        })
        .catch(err=> console.error("Error al hacer la petición:", err))
    }

  },[ubicacion])

  useEffect(()=>{

    const values = State.getStatesOfCountry(searching)
    setCountryCity(values)
  },[searching])

  const handleSerching = (e :  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputValues =  (e.target as HTMLFormElement).elements.namedItem("input") as HTMLInputElement;

    setCountry(inputValues.value);
    

  };
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValues = selectRefCountry.current?.value;
    const values =  State.getStatesOfCountry(inputValues)
    setCountryCity(values)
  };

  const handleCityChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIsoCode = selectRefCity.current?.value;


    new Promise(resol => setTimeout(resol, 0));
    const city = countryCity.find((e: any) => e.isoCode === selectedIsoCode);

    const {latitude,longitude} = city
    setUbicacion([{latitude, longitude}])
  };

  const objStyle  = {
    backgroundImage: `url(/img/img${photoSelected}.jpeg)`
  }

  return (
    <Fragment>
      <div style={objStyle} className="h-screen flex flex-col py-10 px-2 md:p-15 bg-cover ">

      <header  className="mx-auto flex gap-3">
        <form onSubmit={handleSerching} className="relative w-fit rounded-full flex items-center space-x-2">
          <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
            <svg
              width="17"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="search"
              className="w-5 h-5 text-gray-700"
            >
              <path
                d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                stroke="currentColor"
                strokeWidth="1.333"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <input
            className="input rounded-full px-5 md:px-0 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
            placeholder="Search..."
            required
            type="text"
            name="input"
            ref={myRef}
          />
        <button className="h-12 bg-sky-400 rounded-md p-3" type="submit">Buscar</button>
        </form>


        <select  onChange={handleCountryChange} ref={selectRefCountry} className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option defaultValue={searching}>{searching}</option>
          {
            nacionalidades.length &&
            (
              nacionalidades.map((opt:any, index:any)=>{
                return(<option key={index} value={opt.codigo}>{opt.nombre}</option>)
              })
            )
          }
        </select>

         <select onChange={handleCityChange} ref={selectRefCity} className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {
            countryCity.length &&
            (
              countryCity.map((opt:any) =>{
                return(<option  key={opt.isoCode} value={opt.isoCode}>{opt.name}</option>)
              })
            )
          }
        </select>
      </header>
      
      {
        whater.length ? <CardClime whater={whater}  grados={grados}/>  
        : (
          <div className="mx-auto mt-10  bg-white bg-opacity-80 p-10 rounded-md flex flex-col gap-10">
            {location ? null : <h2>Es Necesario Dar Permiso a tu ubucasion</h2>}
            
            <div className="flex flex-row gap-2 justify-center">
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>
        )
      }
      {/* <Card/> */}
      </div>
    </Fragment>
  );
};

export default App;
