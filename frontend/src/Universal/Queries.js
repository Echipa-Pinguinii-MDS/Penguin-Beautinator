import axios from 'axios';
import moment from 'moment';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
//fiecare functie are deasupra comentata functia din views care ii corespunde

//user_appointments
export function userAppointments(user_id) {
    return axios({
        method: 'post',
        url: 'users/appointments/',
        data: {
            'user_id': user_id,
        },
        headers: {
            'content-type': 'application/json'
        }
    }).then(result => {
        let appointments = []

        if (result.data['user_appointments'].empty) {
            console.log('user nu are appointments')
        } else {
            for (let i = 0; i < result.data['user_appointments'].length; i ++) {
                let data = result.data['user_appointments'][i]
                let day = moment(data.day, 'YYYY-MM-DD')
                let start_time = moment(data.start_time, 'HH:mm:ss+-HH:mm')
                let duration = data.duration
                let end_time = start_time.add({minutes: duration})
                let aux_appointment = {
                    id: data.salon_id,
                    name: data.salon_name,
                    time: [day.format("ddd, DD-MM-YYYY"), start_time.format("HH:mm") + " - " + end_time.format("HH:mm")],
                    price: data.price,
                    services: data.service,
                }
                appointments.push(aux_appointment)
            }
        }

        return appointments
    }).catch(function (error) {
        console.log(error)
    })
}

//user_data_by_email
export function userDataByEmail(user_email) {
    return axios({
        method: 'post',
        url: 'users/profile/',
        data: {
            'user_email': user_email,
        },
        headers: {
            'content-type': 'application/json'
        }
    }).then(result => {
        let userData = {}
        if (!result.data.hasOwnProperty('user_data')) {
            console.log('user nu exista')
        } else {
            let data = result.data['user_data'];
            userData = {
                email: result.data['user_data'].email,
                first_name: result.data['user_data'].first_name,
                last_name: result.data['user_data'].last_name,
                phone: data.phone,
                birthday: Date.parse(data.birthday),
                gender: data.gender
            }
        }

        return userData
    }).catch(function (error) {
        console.log(error)
    })
}

//user_data_by_id
export function userDataById(user_id) {
    return axios({
        method: 'post',
        url: 'users/profile/',
        data: {
            'user_id': user_id,
        },
        headers: {
            'content-type': 'application/json'
        }
    }).then(result => {
        let userData = {}
        if (!result.data.hasOwnProperty('user_data')) {
            console.log('user nu exista')
        } else {
            let data = result.data['user_data']
            userData = {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                birthday: Date.parse(data.birthday),
                gender: data.gender
            }
        }

        return userData
    }).catch(function (error) {
        console.log(error)
    })
}

//salons_list
export function salonsList() {
    return axios({
        method: 'get',
        url: 'salons/',
        headers: {
            'content-type': 'application/json'
        }
    }).then(result => {
        let salons = []
        if (result.data['salons_list'].empty) {
            console.log('nu avem saloane')
        } else {
            for (let i = 0; i < result.data['salons_list'].length; i ++) {
                let data = result.data['salons_list'][i]
                let aux_salon = {
                    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
                    id: data.id,
                    name: data.name,
                    noFullStars: 0,
                    noReviews: 0,
                    noDollars: 0,
                    description: data.description,
                    address: data.address,
                    // location: data.location,
                    images: [],
                    program: ['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 14:00'],
                    phone: [data.phone],
                    email: [data.email]
                }
                salons.push(aux_salon)
            }
        }

        return salons
    }).catch(function (error) {
        console.log(error)
    })
}

//salon_data_by_id
export function salonData(salon_id) {
    let url = 'salons/' + salon_id + '/'
    axios({
        method: 'get',
        url: url,
        headers: {
            'content-type': 'application/json'
        }
    }).then(result => {
        let salon = {}
        if (!result.data.hasOwnProperty('salon_data')) {
            console.log('salon nu exista')
        } else {
            let data = result.data['salon_data']
            salon = {
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Logo_TV_2015.svg/1200px-Logo_TV_2015.svg.png',
                id: data.id,
                name: data.name,
                noFullStars: 0,
                noReviews: 0,
                noDollars: 0,
                description: data.description,
                address: data.address,
                // location: data.location,
                images: [],
                program: ['Luni-Vineri: 9:00 - 21:00', 'Sambata: 9:00 - 14:00'],
                phone: [data.phone],
                email: [data.email]
            }
        }

        return salon
    }).catch(function (error) {
        console.log(error)
    })
}

//salon_services
export function salonServices(salon_id) {
    let url = 'salons/' + salon_id + '/services/'
    return axios({
        method: 'get',
        url: url,
        headers: {
            'content-type': 'application/json'
        }
    }).then(result => {
        let salon_services = {}

        if (result.data['salon_services'].empty) {
            console.log('salon nu are servicii')
        } else {
            for (let i = 0; i < result.data['salon_services'].length; i ++) {
                let data = result.data['salon_services'][i]
                let category = data.category
                let aux_service = {
                    id: data.id,
                    salon: data.salon,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    length: data.duration,
                }

                if (!salon_services.hasOwnProperty(category)) {
                    salon_services[category] = []
                }
                salon_services[category].push(aux_service)
            }
        }

        return salon_services
    }).catch(function (error) {
        console.log(error)
    })
}

export function availableHours(serviceList, salonId, day) {
    let url = 'available/'
    axios({
        method: 'post',
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        data: {
            day: day.format('YYYY-MM-DD'),
            salon_id: salonId,
            services: serviceList
        }
    }).then(result => {
        return result.data['available_hours']
    }).catch(function (error) {
        console.log(error)
    })
}

export function addAppointment(serviceList, salonId, userId, day, time) {
    let url = 'add/appointment'
    return axios({
        method: 'post',
        url: url,
        headers: {
            "content-type": "application/json"
        },
        data: {
            user_id: userId,
            salon_id: salonId,
            services: serviceList,
            day: day.format('YYYY-MM-DD'),
            time: time.format('HH:mm:ss+-HH:mm'),
        },
    }).then(result => {
        return result.data['added']
    }).catch(function (error) {
        console.log(error)
    })
}