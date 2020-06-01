Axios query
---

In partea de sus a fisiererelor unde e folosit:
```javascript
import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
```

Request:
```javascript
axios({
    method: 'put' | 'post' | 'delete' | 'get',
    url: 'user/info/' | 'login/',
    data: {
        'user_email': item.email,
        'label': value,
    },
    headers: {
        "content-type": "application/json"
    },
}).then(result => apel_de_functie(parametrii));
```

Valorile intoarse de request se gasesc in:
```javascript
result.data;
// result.data este un json
// valorile din el se pot accesa asa:
result.data['label']
```

Mai multe detalii [aici](https://github.com/axios/axios/blob/master/README.md).

---

Cookies
---

In partea de sus a fisiererelor unde e folosit:
```javascript
import Cookies from 'js-cookie';
```

Getting si setting:
```javascript
value = Cookies.get('label');
Cookies.set('label', 'value');
// Cookie care expira in 7 zile
Cookies.set('label', 'value', {expires: 7});
```

Verificare ca un cookie exista:
```javascript
let isLoggedIn = (Cookies.get('user_id') !== undefined);
```

Mai multe detalii [aici](https://www.npmjs.com/package/js-cookie).
