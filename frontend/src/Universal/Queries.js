// Lista:
//   - programarile unui user (id ca parametru) / post
//   - lista saloanelor / get
//   - detaliile unui salon (id ca parametru) / get
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function userAppointments(event, user_id) {
    let appointments = []
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
        else {
            for(var i=0; i<result.data["user_appointments"].length(); i++){
                let aux_appointment = {
                    salon: result.data["user_appointments"][i].salon,
                    client: result.data["user_appointments"][i].client,
                    date_time: result.data["user_appointments"][i].date_time,
                    type: result.data["user_appointments"][i].type,
                    duration: result.data["user_appointments"][i].duration
                }
                appointments.push(aux_appointment)
            }
        }
    }).catch(function (error) {
        console.log(error);
    });

    return appointments;
}

function salonsList(event) {
    let salons = [];
    axios({
        method: 'get',
        url: 'salons/',
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(result.data["salons_list"].empty())
            console.log("nu avem saloane")
        else {
            salons.push()
            for(var i=0; i<result.data["salons_list"].length(); i++){
                let aux_salon = {
                    src: 'NULL',
                    id: result.data["salons_list"][i].id,
                    name: result.data["salons_list"][i].name,
                    noFullStars: 'NULL',
                    noReviews: 'NULL',
                    noDollars: 'NULL',
                    description: 'NULL',
                    address: result.data["salons_list"][i].address,
                    images: [],
                    program: ['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 14:00'],
                    phone: ['07********', '031*******'],
                    email: result.data["salons_list"][i].email
                }
                salons.push(aux_salon)
            }
        }
    }).catch(function (error) {
        console.log(error);
    });

    return salons
}

function salonData(event, salon_id) {
    let salon = [] //il fac lista cu un singur element
    let s = 'salons/' + salon_id.toString() + '/';
    axios({
        method: 'get',
        url: s,
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(!result.data["salon_data"])
            console.log("salon nu are date")
        else{
            let aux_salon = {
                src: 'NULL',
                id: result.data["salons_data"].id,
                name: result.data["salons_data"].name,
                noFullStars: 'NULL',
                noReviews: 'NULL',
                noDollars: 'NULL',
                description: 'NULL',
                address: result.data["salons_data"].address,
                images: [],
                program: ['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 14:00'],
                phone: ['07********', '031*******'],
                email: result.data["salons_data"].email
            }
                salon.push(aux_salon)
        }
    }).catch(function (error) {
        console.log(error);
    });

    return salon;
}
