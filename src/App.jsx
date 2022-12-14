import { useEffect } from "react";
import "./App.css";
import Header from "./components/headers/Header";
import { useTelegram } from "./hooks/useTelegram";
import {Routes ,Route } from 'react-router-dom'
import ProductList from './components/productList/ProductList'
import Form from './components/form/Form'



function App() {

    const {tg, onToggleButton} = useTelegram();
    useEffect(() => {
        tg.ready();
    }, []);

   
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route index element ={<ProductList/>}/>
                <Route path = {'form'} element={<Form/>}/>
            </Routes>
        </div>
    );
}

export default App;
