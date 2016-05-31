"use strict";
var cameras = [
    { "name": "Nikon D7000 Body", "icon": "Images/Nikon/NikonD7000Body.png", "price": "576$", "producer": "Nikon" },
    { "name": "Nikon D5300 Body", "icon": "Images/Nikon/NikonD5300Body.png", "price": "515$", "producer": "Nikon" },
    { "name": "Nikon D7100 Body", "icon": "Images/Nikon/NikonD7100Body.png", "price": "729$", "producer": "Nikon" },
    { "name": "Nikon D810 Body", "icon": "Images/Nikon/NikonD810Body.png", "price": "2731$", "producer": "Nikon" },
    { "name": "Nikon D3200 Body", "icon": "Images/Nikon/NikonD3200Body.png", "price": "358$", "producer": "Nikon" },
    { "name": "Nikon D5 Body", "icon": "Images/Nikon/NikonD5Body.png", "price": "7895$", "producer": "Nikon" },
    { "name": "Nikon D7200 Body", "icon": "Images/Nikon/NikonD7200Body.png", "price": "989$", "producer": "Nikon" },
    { "name": "Nikon D810A Body", "icon": "Images/Nikon/NikonD810ABody.png", "price": "3542$", "producer": "Nikon" },
    { "name": "Nikon D5500 Body", "icon": "Images/Nikon/NikonD5500Body.png", "price": "625$", "producer": "Nikon" },
    { "name": "Nikon D750 Body", "icon": "Images/Nikon/NikonD750Body.png", "price": "1684$", "producer": "Nikon" },
    { "name": "Nikon D4S Body", "icon": "Images/Nikon/NikonD4SBody.png", "price": "5106$", "producer": "Nikon" },
    { "name": "Nikon D3300 Body", "icon": "Images/Nikon/NikonD3300Body.png", "price": "389$", "producer": "Nikon" },
    { "name": "Nikon Df Body", "icon": "Images/Nikon/NikonDfBody.png", "price": "2105$", "producer": "Nikon" },
    { "name": "Nikon D610 Body", "icon": "Images/Nikon/NikonD610Body.png", "price": "1330$", "producer": "Nikon" },
    { "name": "Nikon D300s Body", "icon": "Images/Nikon/NikonD300sBody.png", "price": "1512$", "producer": "Nikon" },
    { "name": "Nikon D5200 Body", "icon": "Images/Nikon/NikonD5200Body.png", "price": "432$", "producer": "Nikon" },
    { "name": "Nikon D4 Body", "icon": "Images/Nikon/NikonD4Body.png", "price": "4737$", "producer": "Nikon" },
    { "name": "Nikon D90 Body", "icon": "Images/Nikon/NikonD90Body.png", "price": "199$", "producer": "Nikon" },
    { "name": "Nikon D5100 Body", "icon": "Images/Nikon/NikonD5100Body.png", "price": "85$", "producer": "Nikon" },
    { "name": "Nikon D3100 Body", "icon": "Images/Nikon/NikonD3100Body.png", "price": "179$", "producer": "Nikon" },
    { "name": "Nikon D500 Body", "icon": "Images/Nikon/NikonD500Body.png", "price": "99$", "producer": "Nikon" },
    { "name": "Nikon D800E Body", "icon": "Images/Nikon/NikonD800EBody.png", "price": "69$", "producer": "Nikon" },
    { "name": "Nikon D800 Body", "icon": "Images/Nikon/NikonD800Body.png", "price": "141$", "producer": "Nikon" },
    { "name": "Nikon D600 Body", "icon": "Images/Nikon/NikonD600Body.png", "price": "189$", "producer": "Nikon" },
    { "name": "Canon EOS 6D Body", "icon": "Images/Canon/CanonEOS6DBody.png", "price": "1405$", "producer": "Canon" },
    {
        "name": "Canon EOS 700D Body",
        "icon": "Images/Canon/CanonEOS700DBody.png",
        "price": "487$",
        "producer":
            "Canon"
    }, {
        "name": "Canon EOS 1100D Body",
        "icon": "Images/Canon/CanonEOS1100DBody.png",
        "price": "308$",
        "producer": "Canon"
    }, {
        "name": "Canon EOS 650D Body",
        "icon": "Images/Canon/CanonEOS650DBody.png",
        "price": "432$",
        "producer": "Canon"
    },
    {
        "name": "Canon EOS 750D Body",
        "icon": "Images/Canon/CanonEOS750DBody.png",
        "price": "607$",
        "producer":
            "Canon"
    },
    { "name": "Canon EOS 80D Body", "icon": "Images/Canon/CanonEOS80DBody.png", "price": "1511$", "producer": "Canon" },
    {
        "name": "Canon EOS 760D Body",
        "icon": "Images/Canon/CanonEOS760DBody.png",
        "price": "723$",
        "producer":
            "Canon"
    }, {
        "name": "Canon EOS 5Ds R Body",
        "icon": "Images/Canon/CanonEOS5DsRBody.png",
        "price": "4210$",
        "producer": "Canon"
    },
    { "name": "Canon EOS 5Ds Body", "icon": "Images/Canon/CanonEOS5DsBody.png", "price": "3559$", "producer": "Canon" },
    {
        "name": "Canon EOS 7D Mark II Body",
        "icon": "Images/Canon/CanonEOS7DMarkIIBody.png",
        "price": "1368$",
        "producer": "Canon"
    }, {
        "name": "Canon EOS 1200D Body",
        "icon": "Images/Canon/CanonEOS1200DBody.png",
        "price": "311$",
        "producer": "Canon"
    }, {
        "name": "Canon EOS 70D Body",
        "icon": "Images/Canon/CanonEOS70DBody.png",
        "price": "836$",
        "producer": "Canon"
    },
    {
        "name": "Canon EOS 100D Body",
        "icon": "Images/Canon/CanonEOS100DBody.png",
        "price": "421$",
        "producer":
            "Canon"
    }, {
        "name": "Canon EOS-1D X Body",
        "icon": "Images/Canon/CanonEOS-1DXBody.png",
        "price": "5263$",
        "producer": "Canon"
    }, {
        "name": "Canon EOS-1D C Body",
        "icon": "Images/Canon/CanonEOS-1DCBody.png",
        "price": "7895$",
        "producer": "Canon"
    }, {
        "name": "Canon EOS 5D Mark III Body",
        "icon": "Images/Canon/CanonEOS5DMarkIIIBody.png",
        "price": "2382$",
        "producer": "Canon"
    }, {
        "name": "Canon EOS 600D Body",
        "icon": "Images/Canon/CanonEOS600DBody.png",
        "price": "110$",
        "producer": "Canon"
    }, {
        "name": "Canon EOS 60D Body",
        "icon": "Images/Canon/CanonEOS60DBody.png",
        "price": "151$",
        "producer": "Canon"
    },
    {
        "name": "Canon EOS-1D X Mark II",
        "icon": "Images/Canon/CanonEOS-1DXMarkII.png",
        "price": "144$",
        "producer": "Canon"
    }, { "name": "Canon EOS 7D Body", "icon": "Images/Canon/CanonEOS7DBody.png", "price": "141$", "producer": "Canon" },
    {
        "name": "Canon EOS 60Da Body",
        "icon": "Images/Canon/CanonEOS60DaBody.png",
        "price": "127$",
        "producer":
            "Canon"
    },
    {
        "name": "Sony a7 II Body (ILCE-7M2)",
        "icon": "Images/Sony/Sonya7IIBody(ILCE-7M2).png",
        "price": "1632$",
        "producer": "Sony"
    }, {
        "name": "Sony Alpha SLT-A99 Body",
        "icon": "Images/Sony/SonyAlphaSLT-A99Body.png",
        "price": "1853$",
        "producer": "Sony"
    }, {
        "name": "Sony a7S Body (ILCE-7S)",
        "icon": "Images/Sony/Sonya7SBody(ILCE-7S).png",
        "price": "2105$",
        "producer": "Sony"
    }, {
        "name": "Sony a7R Body (ILCE-7R)",
        "icon": "Images/Sony/Sonya7RBody(ILCE-7R).png",
        "price": "1632$",
        "producer": "Sony"
    }, {
        "name": "Sony a7 Body (ILCE-7)",
        "icon": "Images/Sony/Sonya7Body(ILCE-7).png",
        "price": "1152$",
        "producer": "Sony"
    }, {
        "name": "Sony Alpha SLT-A77V Body",
        "icon": "Images/Sony/SonyAlphaSLT-A77VBody.png",
        "price": "800$",
        "producer": "Sony"
    },
    {
        "name": "Sony Alpha SLT-A58 Body",
        "icon": "Images/Sony/SonyAlphaSLT-A58Body.png",
        "price": "421$",
        "producer": "Sony"
    }, {
        "name": "Sony Alpha SLT-A77 Body",
        "icon": "Images/Sony/SonyAlphaSLT-A77Body.png",
        "price": "78$",
        "producer": "Sony"
    },
    { "name": "Sony Alpha QX1 Body", "icon": "Images/Sony/SonyAlphaQX1Body.png", "price": "89$", "producer": "Sony" },
    {
        "name": "Sony Alpha SLT-A65 Body",
        "icon": "Images/Sony/SonyAlphaSLT-A65Body.png",
        "price": "127$",
        "producer": "Sony"
    }
];