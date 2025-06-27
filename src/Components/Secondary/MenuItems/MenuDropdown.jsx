import React, { useState } from 'react';
import "./MenuItems.css";


function MenuDropdown(btns, dds, tier) {
    if (tier > 5) return <></>;

    const [ dropdown, setDropdown ] = useState("");

    <div className={`menuDropdownContainer tier${tier}`}>
        <MenuBtn type={"Dropdown"} setDD={setDropdown} item={""} Tier={""}/>
        <div className={`menuDropdownDD tier${tier}`}>
            {btns.map((item) => (
                <MenuBtn type={"button"} item={item} Tier={tier + 1}/>
            ))}
            {dds.map((item) => (
                <MenuDropdown btns={""} dds={""} Tier={tier + 1}/>
            ))}
        </div>
    </div>
};

export default MenuDropdown;