import React, { useCallback, useEffect, useState } from "react";
import "./ProductList.css";
import ProductItem from "../productItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
    {
        id: "1",
        title: "Джинсы",
        price: 5000,
        description: "Синего цвета, прямые",
    },
    {
        id: "2",
        title: "Куртка",
        price: 12000,
        description: "Зеленого цвета, теплая",
    },
    {
        id: "3",
        title: "Джинсы 2",
        price: 5000,
        description: "Синего цвета, прямые",
    },
    {
        id: "4",
        title: "Куртка 8",
        price: 122,
        description: "Зеленого цвета, теплая",
    },
    {
        id: "5",
        title: "Джинсы 3",
        price: 5000,
        description: "Синего цвета, прямые",
    },
    {
        id: "6",
        title: "Куртка 7",
        price: 600,
        description: "Зеленого цвета, теплая",
    },
    {
        id: "7",
        title: "Джинсы 4",
        price: 5500,
        description: "Синего цвета, прямые",
    },
    {
        id: "8",
        title: "Куртка 5",
        price: 12000,
        description: "Зеленого цвета, теплая",
    },
];

const ProductList = () => {
    const getTotalPrice = (items) => {
        return items.reduce((acc, item) => {
            return (acc += item.price);
        }, 0);
    };
    const [addedItem, setAddedItem] = useState([]);

    const onSendData = useCallback(() => {
        const data = {
            products: addedItem,
            totalPrice: getTotalPrice(addedItem),
            queryId,
        };
        fetch("https://192.168.0.153:8000/web-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }, [addedItem]);

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData);

        return () => {
            tg.offEvent("mainButtonClicked", onSendData);
        };
    }, [onSendData]);

    
    const { tg, queryId } = useTelegram();
    const onAdd = (product) => {
        let newItems = [];
        const alredyAdded = addedItem.find((item) => item.id === product.id);

        if (alredyAdded) {
            newItems = addedItem.filter((item) => item.id !== product.id);
        } else {
            newItems = [...addedItem, product];
        }

        setAddedItem(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить за  ${getTotalPrice(newItems)}`,
            });
        }
    };
    return (
        <div className={"list"}>
            {products.map((item) => (
                <ProductItem product={item} onAdd={onAdd} className={"item"} />
            ))}
        </div>
    );
};

export default ProductList;
