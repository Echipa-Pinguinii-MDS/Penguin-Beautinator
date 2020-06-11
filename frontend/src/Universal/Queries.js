//fiecare functie are deasupra comentata functia din views care ii corespunde
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

//user_appointments
export function userAppointments(event, user_id) {
    let appointments = []
    axios({
        method: 'post',
        url: 'users/appointments/',
        data: {
            'user_id': user_id,
        },
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if(result.data["user_appointments"].empty)
            console.log("user nu are appointments")
        else {
            for(let i=0; i<result.data["user_appointments"].length; i++){
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
export function userDataByEmail(event, user_email) {
    let userData = []
    axios({
        method: 'post',
        url: 'users/profile/',
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

//user_data_by_id
export function userDataById(event, user_id) {
    let userData = []
    axios({
        method: 'post',
        url: 'users/profile/',
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
export function salonsList() {
    let salons = [];
    axios({
        method: 'get',
        url: 'salons/',
        headers: {
            "content-type": "application/json"
        },
    }).then(result => {
        if (result.data["salons_list"].empty)
            console.log("nu avem saloane")
        else {
            for (let i=0; i<result.data["salons_list"].length; i++){
                let aux_salon = {
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
                    id: String(result.data["salons_list"][i].id),
                    name: result.data["salons_list"][i].name,
                    noFullStars: 0,
                    noReviews: 0,
                    noDollars: 0,
                    description: 'description',
                    address: result.data["salons_list"][i].address,
                    images: [],
                    program: ['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 14:00'],
                    phone: ['07********', '031*******'],
                    email: [result.data["salons_list"][i].email]
                }
                salons.push(aux_salon)
            }
        }
    }).catch(function (error) {
        console.log(error);
    })

    return salons
}

//salon_data_by_id
export function salonData(salon_id) {
    let salon = []
    let s = 'salons/' + salon_id + '/';
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
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
                id: String(result.data["salon_data"].id),
                name: result.data["salon_data"].name,
                noFullStars: 0,
                noReviews: 0,
                noDollars: 0,
                description: 'description',
                address: result.data["salon_data"].address,
                images: [],
                program: ['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 14:00'],
                phone: ['07********', '031*******'],
                email: [result.data["salon_data"].email]
            }
            salon.push(aux_salon)
        }
    }).catch(function (error) {
        console.log(error);
    });

    return salon;
}

//salon_services
export function salonServices(salon_id) {
    let salon_serv = []
    let s = 'salons/' + salon_id + '/services/';
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
            for(let i=0; i<result.data["salon_services"].length; i++) {
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
export function allServices(event) {
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
            for(let i=0; i<result.data["all_services"].length; i++) {
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
