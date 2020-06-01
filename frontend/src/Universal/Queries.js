// Lista:
//   - programarile unui user (id ca parametru) / post
//   - lista saloanelor / get
//   - detaliile unui salon (id ca parametru) / get
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function userAppointments(event, user_id) {
    axios({
        method: 'post',
        url: 'user/appointments/',
        data: {
            'id': user_id,
        },
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(result.data["user_appointments"].empty())
            console.log("user nu are appointments")
        else
            console.log("returnezi ceva")
    }).catch(function (error) {
        console.log(error);
    });

    return salons; //construit in else
}

function salonsList(event) {
    var salons = []
    axios({
        method: 'get',
        url: 'salons/',
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(result.data["salons_list"].empty())
            console.log("nu avem saloane")
        else
            salons;
    }).catch(function (error) {
        console.log(error);
    });

    return salons
}

function salonData(event, salon_id) {
    let s = 'salons/';
    let t = salon_id.toString();
    s = s + t + '/';
    axios({
        method: 'get',
        url: s,
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(!result.data["salon_data"])
            console.log("salon nu are date")
        else
            console.log("returnezi ceva")
    }).catch(function (error) {
        console.log(error);
    });
}