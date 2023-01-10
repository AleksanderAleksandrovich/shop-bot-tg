import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";

const Form = () => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [object, setObject] = useState("phisical");
    const { tg } = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Отправить запрос.",
        });
    }, []);

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            object,
        }
        tg.sendData(JSON.stringify(data))
    },[country, city, object]);

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData);

        return () => {
            tg.offEvent("mainButtonClicked", onSendData);
        };
    }, [onSendData]);

    useEffect(() => {
        if (!city || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, city]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    };
    const onChangeCity = (e) => {
        setCity(e.target.value);
    };
    const onChangeObject = (e) => {
        setObject(e.target.value);
    };
    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={"input"}
                type="text"
                placeholder={"Страна"}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={"input"}
                type="text"
                placeholder={"Город"}
                value={city}
                onChange={onChangeCity}
            />

            <select className="select" value={object} onChange={onChangeObject}>
                <option value="phisikal">Физическое лицо</option>
                <option value="legal">Юридическое лицо</option>
            </select>
        </div>
    );
};

export default Form;
