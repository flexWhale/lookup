"use strict";
var phones = [
    { "caption": "C3592 Duos", "image": "Images/Samsung/SamsungC3592Duos.png", "usd": "65$", "company": "Samsung" },
    {
        "caption": "Galaxy E5 Duos",
        "image": "Images/Samsung/SamsungGalaxyE5Duos.png",
        "usd": "231$",
        "company": "Samsung"
    },
    {
        "caption": "Galaxy E7 (E700)",
        "image": "Images/Samsung/SamsungGalaxyE7(E700).png",
        "usd": "332$",
        "company": "Samsung"
    }, {
        "caption": "Galaxy Note Edge",
        "image": "Images/Samsung/SamsungGalaxyNoteEdge.png",
        "usd": "579$",
        "company": "Samsung"
    }, {
        "caption": "S5830 Galaxy Ace",
        "image": "Images/Samsung/SamsungS5830GalaxyAce.png",
        "usd": "89$",
        "company": "Samsung"
    },
    { "caption": "iPhone 4s (8GB)", "image": "Images/Apple/AppleiPhone4s(8GB).png", "usd": "167$", "company": "Apple" },
    {
        "caption": "iPhone 5c (16GB)",
        "image": "Images/Apple/AppleiPhone5c(16GB).png",
        "usd": "57$",
        "company":
            "Apple"
    }, {
        "caption": "iPhone 6 64GB Gold",
        "image": "Images/Apple/AppleiPhone664GBGold.png",
        "usd": "816$",
        "company": "Apple"
    }, {
        "caption": "iPhone 5c 8GB Yellow",
        "image": "Images/Apple/AppleiPhone5c8GBYellow.png",
        "usd": "332$",
        "company": "Apple"
    }, {
        "caption": "iPhone 6s 16GB Silver",
        "image": "Images/Apple/AppleiPhone6s16GBSilver.png",
        "usd": "816$",
        "company": "Apple"
    },
    { "caption": "MI2A", "image": "Images/Xiaomi/XiaomiMI2A.png", "usd": "184$", "company": "Xiaomi" },
    { "caption": "Redmi 1S Red", "image": "Images/Xiaomi/XiaomiRedmi1SRed.png", "usd": "136$", "company": "Xiaomi" },
    { "caption": "MI-2s (32Gb)", "image": "Images/Xiaomi/XiaomiMI-2s(32Gb).png", "usd": "65$", "company": "Xiaomi" },
    { "caption": "MI-2s (16Gb)", "image": "Images/Xiaomi/XiaomiMI-2s(16Gb).png", "usd": "135$", "company": "Xiaomi" },
    { "caption": "Redmi Note 4G", "image": "Images/Xiaomi/XiaomiRedmiNote4G.png", "usd": "184$", "company": "Xiaomi" },
    { "caption": "G525", "image": "Images/Huawei/HuaweiG525.png", "usd": "105$", "company": "Huawei" },
    { "caption": "G610-C00", "image": "Images/Huawei/HuaweiG610-C00.png", "usd": "121$", "company": "Huawei" },
    { "caption": "G610-U20", "image": "Images/Huawei/HuaweiG610-U20.png", "usd": "121$", "company": "Huawei" },
    { "caption": "G610s-U00", "image": "Images/Huawei/HuaweiG610s-U00.png", "usd": "121$", "company": "Huawei" },
    { "caption": "Ascend W1", "image": "Images/Huawei/HuaweiAscendW1.png", "usd": "132$", "company": "Huawei" },
    { "caption": "A328", "image": "Images/Lenovo/LenovoA328.png", "usd": "105$", "company": "Lenovo" },
    { "caption": "A820", "image": "Images/Lenovo/LenovoA820.png", "usd": "137$", "company": "Lenovo" },
    { "caption": "S856", "image": "Images/Lenovo/LenovoS856.png", "usd": "153$", "company": "Lenovo" },
    { "caption": "S660", "image": "Images/Lenovo/LenovoS660.png", "usd": "168$", "company": "Lenovo" },
    { "caption": "A399", "image": "Images/Lenovo/LenovoA399.png", "usd": "91$", "company": "Lenovo" },
    { "caption": "One ME", "image": "Images/HTC/HTCOneME.png", "usd": "500$", "company": "HTC" },
    { "caption": "Wildfire", "image": "Images/HTC/HTCWildfire.png", "usd": "105$", "company": "HTC" },
    { "caption": "Desire P", "image": "Images/HTC/HTCDesireP.png", "usd": "142$", "company": "HTC" },
    { "caption": "Desire S", "image": "Images/HTC/HTCDesireS.png", "usd": "89$", "company": "HTC" },
    { "caption": "Desire 610", "image": "Images/HTC/HTCDesire610.png", "usd": "203$", "company": "HTC" },
    { "caption": "L70 (D325)", "image": "Images/LG/LGL70(D325).png", "usd": "105$", "company": "LG" },
    { "caption": "L Fino (D295)", "image": "Images/LG/LGLFino(D295).png", "usd": "132$", "company": "LG" },
    { "caption": "L Fino (D290n)", "image": "Images/LG/LGLFino(D290n).png", "usd": "131$", "company": "LG" },
    { "caption": "G2 Mini (D618)", "image": "Images/LG/LGG2Mini(D618).png", "usd": "246$", "company": "LG" },
    { "caption": "G5 Pink [H860]", "image": "Images/LG/LGG5Pink[H860].png", "usd": "789$", "company": "LG" }
];