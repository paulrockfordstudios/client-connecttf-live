import React from 'react';
import "./MenuItems.css";


function MenuBtn(type, setDD, item, tier) {

    const dropdownHandler = (target) => {
        if (dd === target) {
            setDD("")
        } else {
            setDD(target)
        }
    };

    const menuHandler = (target) => {
    };

    const clickHandler = (target) => {
        if (type === Dropdown) {
            dropdownHandler(target);
        } else {
            menuHandler(target);
        }
    };

    return (
        <button
            key={item} 
            className={`smb-topicDropdownMenuItemBtn ${tier}`}
            onClick={() => clickHandler(item)}
        >
            {item}
        </button>
    )
};

export default MenuBtn;