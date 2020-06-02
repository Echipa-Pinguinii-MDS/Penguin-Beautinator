//fiecare functie are deasupra comentata functia din views care ii corespunde
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

//user_appointments
function userAppointments(event, user_id) {
    let appointments = []
    axios({
        method: 'post',
        url: 'user/appointments/',
        data: {
            'user_id': user_id,
        },
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(result.data["user_appointments"].empty())
            console.log("user nu are appointments")
        else {
            for(let i=0; i<result.data["user_appointments"].length(); i++){
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
//user_data_by_email
function userDataByEmail(event, user_email) {
    let userData = []
    axios({
        method: 'post',
        url: 'user/profile/',
        data: {
            'user_email': user_email,
        },
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(!result.data["user_data"])
            console.log("user nu exista")
        else {
            let aux_data = {
                email: result.data["user_data"].email,
                //password: result.data["user_data"].password,
                first_name: result.data["user_data"].first_name,
                last_name: result.data["user_data"].last_name,
            }
            userData.push(aux_data)
        }
    }).catch(function (error) {
        console.log(error);
    });

    return userData;
}
//user_data_by_email
function userDataById(event, user_id) {
    let userData = []
    axios({
        method: 'post',
        url: 'user/profile/',
        data: {
            'user_id': user_id,
        },
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(!result.data["user_data"])
            console.log("user nu exista")
        else {
            let aux_data = {
                email: result.data["user_data"].email,
                //password: result.data["user_data"].password,
                first_name: result.data["user_data"].first_name,
                last_name: result.data["user_data"].last_name,
            }
            userData.push(aux_data)
        }
    }).catch(function (error) {
        console.log(error);
    });

    return userData;
}
//salons_list
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
            for(let i=0; i<result.data["salons_list"].length(); i++){
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
//salon_data_by_id
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
        else {
            let aux_salon = {
                src: 'NULL',
                id: result.data["salon_data"].id,
                name: result.data["salon_data"].name,
                noFullStars: 'NULL',
                noReviews: 'NULL',
                noDollars: 'NULL',
                description: 'NULL',
                address: result.data["salon_data"].address,
                images: [],
                program: ['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 14:00'],
                phone: ['07********', '031*******'],
                email: result.data["salon_data"].email
            }
            salon.push(aux_salon)
        }
    }).catch(function (error) {
        console.log(error);
    });

    return salon;
}
//salon_services
function salonServices(event, salon_id) {
    let salon_serv = []
    let s = 'salons/' + salon_id.toString() + '/services/';
    axios({
        method: 'get',
        url: s,
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(!result.data["salon_services"])
            console.log("salon nu are date")
        else{
            for(let i=0; i<result.data["salon_services"].length(); i++) {
                let aux_serv = {
                    salon: result.data["salon_services"].salon,
                    employee: result.data["salon_services"].employee,
                    title: result.data["salon_services"].title,
                    description: result.data["salon_services"].description,
                    price: result.data["salon_services"].price,
                    open_timeslots: result.data["salon_services"].open_timeslots,
                    available_timeslots: result.data["salon_services"].available_timeslots
                }
                salon_serv.push(aux_serv)
            }
        }
    }).catch(function (error) {
        console.log(error);
    });

    return salon_serv;
}
//all_services
function allServices(event) {
    let serv = []
    axios({
        method: 'get',
        url: 'services/',
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(!result.data["all_services"])
            console.log("salon nu are date")
        else{
            for(let i=0; i<result.data["all_services"].length(); i++) {
                let aux_serv = {
                    salon: result.data["all_services"].salon,
                    employee: result.data["all_services"].employee,
                    title: result.data["all_services"].title,
                    description: result.data["all_services"].description,
                    price: result.data["all_services"].price,
                    open_timeslots: result.data["all_services"].open_timeslots,
                    available_timeslots: result.data["all_services"].available_timeslots
                }
                serv.push(aux_serv)
            }
        }
    }).catch(function (error) {
        console.log(error);
    });

    return serv;
}
