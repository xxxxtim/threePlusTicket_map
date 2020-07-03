
// 設定中心點
var map = L.map('map', {
    center: [22.604799, 120.2976256],
    zoom: 16
});

// setView 可以設定地圖座標
// watch 則是持續監聽使用者的位置
// map.locate({ setView: true, watch: true });


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// var icons = new L.Icon({
//     iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });

// 新增圖層專門放icon
var markers = new L.MarkerClusterGroup().addTo(map);;
// link coffee api
var xhr = new XMLHttpRequest();
var cors = 'https://cors-anywhere.herokuapp.com/';
var url = 'https://3000.gov.tw/hpgapi-openmap/api/getPostData';
xhr.open("get", `${url}`);
xhr.send();
xhr.onload = function () {
    var datas = JSON.parse(xhr.responseText)
    datas.map(function (value, index) {
        let iconColor;
        if (value.total == 0) {
            iconColor = redIcon
        }
        else { iconColor = greenIcon }
        // if (value.total == 0) {
        //     icons.iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
        // }
        // else {
        //     icons.iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
        // }

        markers.addLayer(L.marker([value.latitude, value.longitude], { icon: iconColor }).bindPopup(`<table>
        <thead>
            <tr>
                <th colspan="2">${value.storeNm}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>地址</td>
                <td>${value.addr}</td>
            </tr>
            <tr>
                <td>電話</td>
                <td>${value.tel}</td>
            </tr>
            <tr>
                <td>營業時間</td>
                <td>${value.busiTime}</td>
            </tr>
            <tr>
                <td>存貨量</td>
                <td>${value.total}</td>
            </tr>
            
        </tbody>
        </table>`));
    })
    map.addLayer(markers);
}























